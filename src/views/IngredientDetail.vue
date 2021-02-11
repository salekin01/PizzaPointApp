<template>
    <v-col>
        <v-data-table
                :headers="headers"
                :items="ingredientList"
                sort-by="ingredientId"
                sortDesc
                class="elevation-5 orange lighten-5"
        >
            <template v-slot:top>
                <v-toolbar class="orange lighten-4">
                    <v-spacer></v-spacer>
                    <v-dialog
                            v-model="dialog"
                            max-width="500px"
                    >
                        <!--add-->
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="success"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                    elevation="5"
                            >
                                +Add
                            </v-btn>
                        </template>

                        <!--edit-->
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.ingredientName"
                                                    label="Name"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-select
                                                    :items="ingredientCategoryItems"
                                                    item-text="categoryName"
                                                    item-value="ingredientCategoryId"
                                                    v-model="editedItem.ingredientCategoryId"
                                                    label="Category"
                                                    dense
                                            ></v-select>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-select
                                                    :items="regionalProvinceItems"
                                                    item-text="regionalProvinceName"
                                                    item-value="regionalProvinceId"
                                                    v-model="editedItem.regionalProvinceId"
                                                    label="Province"
                                                    dense
                                            ></v-select>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="close"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                        color="blue darken-1"
                                        text
                                        @click="save"
                                >
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn
                        elevation="5"
                        color="success"
                        @click="initialize"
                >
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </v-col>
</template>

<script>
    import http from "../http-common";

    export default {
        data: () => ({
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: 'Name',
                    align: 'start',
                    sortable: true,
                    value: 'ingredientName',
                    class: 'subtitle-1 font-weight-black'
                },
                {text: 'Category', value: 'ingredientCategoryName', class: 'subtitle-1 font-weight-black'},
                {text: 'Regional-Province', value: 'regionalProvinceName', class: 'subtitle-1 font-weight-black'},
                {text: 'Created Date', value: 'createdDate', class: 'subtitle-1 font-weight-black'},
                {text: 'Updated Date', value: 'updatedDate', class: 'subtitle-1 font-weight-black'},
                {text: 'Actions', value: 'actions', sortable: false, class: 'subtitle-1 font-weight-black'},
            ],
            ingredientCategoryItems: [],
            regionalProvinceItems: [],
            ingredientList: [],
            editedIndex: -1,
            editedItem: {
                ingredientId: 0,
                ingredientName: '',
                ingredientCategoryId: 0,
                regionalProvinceId: 0,
                createdDate: '',
                updatedDate: '',
                ingredientCategoryName: '',
                regionalProvinceName: ''
            },
            defaultItem: {
                ingredientId: 0,
                ingredientName: '',
                ingredientCategoryId: 0,
                regionalProvinceId: 0,
                createdDate: '',
                updatedDate: '',
                ingredientCategoryName: '',
                regionalProvinceName: ''
            }
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Ingredient' : 'Edit Ingredient'
            }
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
            dialogDelete(val) {
                val || this.closeDelete()
            },
        },

        created() {
            this.initialize()
        },

        methods: {
            initialize() {
                this.getIngredientList(),
                    this.ingredientCategoryItemsDD(),
                    this.regionalProvinceItemsDD()
            },

            getIngredientList() {
                http
                    .get("/ingredientDetail")
                    .then(response => {
                        this.ingredientList = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            editItem(item) {
                console.log(item);
                this.editedIndex = this.ingredientList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                this.editedIndex = this.ingredientList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm() {
                http
                    .delete("/ingredientDetail/" + this.editedItem.ingredientId)
                    .then(response => {
                        var result = response.data;
                        if (result == 1) {
                            //this.ingredientList.splice(this.editedIndex, 1)
                            this.getIngredientList();
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
                this.closeDelete()
            },

            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            closeDelete() {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save() {
                //edit item
                if (this.editedIndex > -1) {
                    //Object.assign(this.ingredientList[this.editedIndex], this.editedItem);
                    http
                        .post("/ingredientDetail/" + this.editedItem.ingredientId, this.editedItem)
                        .then(response => {
                            var result = response.data;
                            if (result == 1) {
                                this.getIngredientList();
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                //new item
                else {
                    //this.ingredientList.push(this.editedItem);
                    http
                        .post("/ingredientDetail", this.editedItem)
                        .then(response => {
                            var result = response.data;
                            if (result == 1) {
                                this.getIngredientList();
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                this.close()
            },
            ingredientCategoryItemsDD() {
                http
                    .get("/ingredientCategory")
                    .then(response => {
                        this.ingredientCategoryItems = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            regionalProvinceItemsDD() {
                http
                    .get("/regionalProvince")
                    .then(response => {
                        this.regionalProvinceItems = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
    }
</script>
