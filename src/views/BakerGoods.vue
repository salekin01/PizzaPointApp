<template>
    <v-container fluid>
        <v-col>
            <div>
                <div>
                    <h3 align="center"> Ingredients in stock </h3>
                    <v-data-table
                            :headers="headers"
                            :items="mainList"
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
                                                            no-gutters
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                    >
                                                        <v-select
                                                                :items="provinceListItems"
                                                                item-text="regionalProvinceName"
                                                                item-value="regionalProvinceId"
                                                                v-model="editedItem.regionalProvinceId"
                                                                label="Regional-Province"
                                                                dense
                                                        ></v-select>
                                                    </v-col>
                                                    <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                    >
                                                        <v-select
                                                                :items="ingredientListItems.filter(c => c.regionalProvinceId === editedItem.regionalProvinceId)"
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
                                                    <v-col
                                                            cols="12"
                                                            sm="6"
                                                            md="4"
                                                    >
                                                        <v-select
                                                                :items="hiddenItems"
                                                                item-text="text"
                                                                item-value="value"
                                                                v-model="editedItem.hidden"
                                                                label="Hide"
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
                                        <v-card-title class="headline">Are you sure you want to delete this item?
                                        </v-card-title>
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
                                    class="mr-2"
                                    @click="editItem(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                    @click="deleteItem(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:no-data>
                            <v-btn
                                    color="success"
                                    @click="initialize"
                            >
                                Reset
                            </v-btn>
                        </template>
                    </v-data-table>
                </div>

                <br/>  <!--2nd table-->

                <div>
                    <h3 align="center" content="grey darken-1"> Restock ingredients </h3>
                    <v-data-table
                            v-model="selected"
                            :headers="headers1"
                            :items="supplierIngredientList"
                            :single-select="singleSelect"
                            :search="search"
                            item-key="supplierGoodsId"
                            show-select
                            class="elevation-5 orange lighten-5"
                    >
                        <template v-slot:top>
                            <v-toolbar  class="orange lighten-4">
                                <v-layout>
                                    <v-flex xs6>
                                        <v-flex mt-9 >
                                            <v-switch
                                                    v-model="singleSelect"
                                                    label="Single select"
                                            ></v-switch>
                                        </v-flex>
                                        <v-flex mb-10 mt-n5>
                                            <v-text-field
                                                    v-model="search"
                                                    append-icon="mdi-magnify"
                                                    label="Search"
                                                    single-line
                                                    hide-details
                                            ></v-text-field>
                                        </v-flex>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-flex class="text-right" mt-12>
                                            <v-btn
                                                    color="success"
                                                    dark
                                                    v-on:click="orderIngredientList"
                                                    elevation="5"
                                            >
                                                +Order
                                            </v-btn>
                                            <v-btn
                                                    color="success"
                                                    dark
                                                    v-on:click="reloadTable"
                                                    elevation="5"
                                                    px-10
                                            >
                                                Reload
                                            </v-btn>
                                        </v-flex>
                                    </v-flex>
                                </v-layout>
                            </v-toolbar>
                        </template>

                        <template v-slot:item.unitsInStock="props">
                            <v-edit-dialog
                                    :return-value.sync="props.item.unitsInStock"
                            >
                                {{ props.item.unitsInStock }}
                                <template v-slot:input>
                                    <v-text-field
                                            v-model="props.item.unitsInStock"
                                            :rules="[max25chars]"
                                            label="Units To Order"
                                            single-line
                                            counter
                                    ></v-text-field>
                                </template>
                            </v-edit-dialog>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </v-col>
    </v-container>
</template>


<script>
    import http from "../http-common";

    export default {
        data: () => ({
            dialog: false,
            dialogDelete: false,
            regionalProvinceIdSlected: null,
            headers: [
                {
                    text: 'Ingredient',
                    align: 'start',
                    sortable: true,
                    value: 'ingredientName',
                    class: 'subtitle-1 font-weight-black'
                },
                {text: 'Regional-Province', value: 'regionalProvinceName', class: 'subtitle-1 font-weight-black'},
                {text: 'Quantity/Unit', value: 'quantityPerUnit', class: 'subtitle-1 font-weight-black'},
                {text: 'unit Price', value: 'unitPrice', class: 'subtitle-1 font-weight-black'},
                {text: 'Units In Stock', value: 'unitsInStock', class: 'subtitle-1 font-weight-black'},
                {text: 'Hide', value: 'hidden', class: 'subtitle-1 font-weight-black'},
                {text: 'Created Date', value: 'createdDate', class: 'subtitle-1 font-weight-black'},
                {text: 'Updated Date', value: 'updatedDate', class: 'subtitle-1 font-weight-black'},
                {text: 'Actions', value: 'actions', sortable: false, class: 'subtitle-1 font-weight-black'},
            ],
            hiddenItems: [{
                text: "TRUE",
                value: true
            },
                {
                    text: "FALSE",
                    value: false
                }],
            provinceListItems: [],
            ingredientListItems: [],
            mainList: [],
            editedIndex: -1,
            editedItem: {
                bakerGoodsId: 0,
                ingredientId: 0,
                quantityPerUnit: 0,
                unitPrice: 0.0,
                unitsInStock: 0,
                hidden: false,
                createdDate: '',
                updatedDate: '',
                ingredientCategoryId: 0,
                regionalProvinceId: 0,
                ingredientName: '',
                ingredientCategoryName: '',
                regionalProvinceName: '',
                requiredDate: ''
            },
            defaultItem: {
                bakerGoodsId: 0,
                ingredientId: 0,
                quantityPerUnit: 0,
                unitPrice: 0.0,
                unitsInStock: 0,
                hidden: false,
                createdDate: '',
                updatedDate: '',
                ingredientCategoryId: 0,
                regionalProvinceId: 0,
                ingredientName: '',
                ingredientCategoryName: '',
                regionalProvinceName: '',
                requiredDate: ''
            },
            //"2nd table"
            headers1: [
                {
                    text: 'Supplier',
                    align: 'start',
                    sortable: true,
                    value: 'supplierName',
                    class: 'subtitle-1 font-weight-black'
                },
                {text: 'Ingredient', value: 'ingredientName', class: 'subtitle-1 font-weight-black'},
                {text: 'Regional-Province', value: 'regionalProvinceName', class: 'subtitle-1 font-weight-black'},
                {text: 'Quantity/Unit', value: 'quantityPerUnit', class: 'subtitle-1 font-weight-black'},
                {text: 'unitPrice', value: 'unitPrice', class: 'subtitle-1 font-weight-black'},
                {text: 'Units In Stock', value: 'unitsInStock', class: 'subtitle-1 font-weight-black'}
            ],
            search: '',
            supplierIngredientList: [],
            supplierListItems: [],
            singleSelect: true,
            selected: [],
            max25chars: v => v.length <= 25 || 'Input too long!',
            supplierId: 0,
            supplierName: '',
            supplierGoodsId: 0,
            unitsInStock: 0,
            ingredientId: 0,

            singleIngred: '',
            orderedId: ''
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Baker-Ingredient' : 'Edit Baker-Ingredient'
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
                    this.provinceListItemsDD(),
                    this.ingredientListItemsDD(),
                    this.getSupplierList(),
                    this.supplierListItemsDD()
            },

            getMainList() {
                http
                    .get("/bakerGoods")
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
                    .delete("/bakerGoods/" + this.editedItem.bakerGoodsId)
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
                        .post("/bakerGoods/" + this.editedItem.bakerGoodsId, this.editedItem)
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
                        .post("/bakerGoods", this.editedItem)
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
            provinceListItemsDD() {
                http
                    .get("/regionalProvince")
                    .then(response => {
                        this.provinceListItems = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
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
            //2nd table methods
            getSupplierList() {
                http
                    .get("/supplierGoods")
                    .then(response => {
                        this.supplierIngredientList = response.data; // JSON are parsed automatically.
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
            },
            orderIngredientList() {
                http
                    .post("/orderIngredient")
                    .then(response => {
                        this.orderedId = response.data;
                        this.orderIngredientDetailCreate();
                        this.reloadTable();
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            orderIngredientDetailCreate() {
                var i = 0;
                for (i = 0; i < this.selected.length; i++) {
                    http
                        .post("/orderIngredientDetailByOrderedId/" + this.orderedId, this.selected[i])
                        .then(response => {
                            var result = response.data;
                            console.log(result);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            },
            reloadTable() {
                this.getMainList();
                this.getSupplierList();
            }
        },
    }
</script>
