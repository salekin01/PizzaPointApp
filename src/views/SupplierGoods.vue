<template>
    <v-col>
        <v-data-table
                :headers="headers"
                :items="mainList"
                sort-by="ingredientId"
                sortDesc
                class="elevation-5 orange lighten-5"
        >
            <template v-slot:top>
                <v-toolbar class="orange lighten-5">
                    <v-spacer></v-spacer>
                    <v-dialog
                            v-model="dialog"
                            max-width="500px"
                    >
                        <!--add-->
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
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
                                                no-gutters
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-select
                                                    :items="supplierListItems"
                                                    item-text="supplierName"
                                                    item-value="supplierId"
                                                    v-model="editedItem.supplierId"
                                                    label="Supplier"
                                                    dense
                                            ></v-select>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-select
                                                    :items="ingredientListItems"
                                                    item-text="ingredientName"
                                                    item-value="ingredientId"
                                                    v-model="editedItem.ingredientId"
                                                    label="Ingredient"
                                                    dense
                                            ></v-select>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.quantityPerUnit"
                                                    label="Quantity/Unit"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.unitPrice"
                                                    label="Unit Price"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.unitsInStock"
                                                    label="Units In Stock"
                                            ></v-text-field>
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
                    text: 'Supplier',
                    align: 'start',
                    sortable: true,
                    value: 'supplierName',
                    class: 'subtitle-1 font-weight-black'
                },
                {text: 'Ingredient', value: 'ingredientName',class: 'subtitle-1 font-weight-black'},
                {text: 'Regional-Province', value: 'regionalProvinceName', class: 'subtitle-1 font-weight-black'},
                {text: 'Quantity/Unit', value: 'quantityPerUnit', class: 'subtitle-1 font-weight-black'},
                {text: 'unitPrice', value: 'unitPrice', class: 'subtitle-1 font-weight-black'},
                {text: 'UnitsInStock', value: 'unitsInStock', class: 'subtitle-1 font-weight-black'},
                {text: 'Created Date', value: 'createdDate', class: 'subtitle-1 font-weight-black'},
                {text: 'Updated Date', value: 'updatedDate', class: 'subtitle-1 font-weight-black'},
                {text: 'Actions', value: 'actions', sortable: false, class:'subtitle-2 font-weight-black'},
            ],
            ingredientListItems: [],
            supplierListItems: [],
            mainList: [],
            editedIndex: -1,
            editedItem: {
                supplierGoodsId: 0,
                supplierId: 0,
                ingredientId: 0,
                quantityPerUnit: 0,
                unitPrice: 0.0,
                unitsInStock: 0,
                hidden: false,
                createdDate: '',
                updatedDate: '',
                ingredientCategoryId: 0,
                regionalProvinceId: 0,
                supplierName: '',
                ingredientName: '',
                ingredientCategoryName: '',
                regionalProvinceName: ''
            },
            defaultItem: {
                supplierGoodsId: 0,
                supplierId: 0,
                ingredientId: 0,
                quantityPerUnit: 0,
                unitPrice: 0.0,
                unitsInStock: 0,
                hidden: false,
                createdDate: '',
                updatedDate: '',
                ingredientCategoryId: 0,
                regionalProvinceId: 0,
                supplierName: '',
                ingredientName: '',
                ingredientCategoryName: '',
                regionalProvinceName: ''
            },
            imageUrl1: "https://i.postimg.cc/sg0wrnDW/Pizza-Chicken4.jpg"
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Supplier-Ingredient' : 'Edit Supplier-Ingredient'
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
                this.getMainList(),
                    this.ingredientListItemsDD(),
                    this.supplierListItemsDD()
            },

            getMainList() {
                http
                    .get("/supplierGoods")
                    .then(response => {
                        this.mainList = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            editItem(item) {
                console.log(item);
                this.editedIndex = this.mainList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                this.editedIndex = this.mainList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm() {
                http
                    .delete("/supplierGoods/" + this.editedItem.supplierGoodsId)
                    .then(response => {
                        var result = response.data;
                        if (result == 1) {
                            //this.mainList.splice(this.editedIndex, 1)
                            this.getMainList();
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
                    //Object.assign(this.mainList[this.editedIndex], this.editedItem);
                    http
                        .post("/supplierGoods/" + this.editedItem.supplierGoodsId, this.editedItem)
                        .then(response => {
                            var result = response.data;
                            if (result == 1) {
                                this.getMainList();
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                //new item
                else {
                    //this.mainList.push(this.editedItem);
                    http
                        .post("/supplierGoods", this.editedItem)
                        .then(response => {
                            var result = response.data;
                            if (result == 1) {
                                this.getMainList();
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                this.close()
            },
            ingredientListItemsDD() {
                http
                    .get("/ingredientDetail")
                    .then(response => {
                        this.ingredientListItems = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            supplierListItemsDD() {
                http
                    .get("/supplier")
                    .then(response => {
                        this.supplierListItems = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        },
    }
</script>
