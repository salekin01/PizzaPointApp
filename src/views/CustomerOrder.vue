<template>
    <v-col>
        <div>
            <div>
                <h3 align="center"> Order List </h3>
                <v-data-table
                        :headers="headers"
                        :items="mainList"
                        sort-by="orderPizzaId"
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
                                                    <v-select
                                                            :items="cancelItems"
                                                            item-text="text"
                                                            item-value="value"
                                                            v-model="editedItem.canceled"
                                                            label="Cancel"
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
                                @click="showItem(item)"
                        >
                            mdi-eye-outline
                        </v-icon>
                    </template>
                    <template v-slot:no-data>
                        <v-btn
                                color="primary"
                                @click="initialize"
                        >
                            Reset
                        </v-btn>
                    </template>
                </v-data-table>
            </div>

            <br/>  <!--2nd table-->

            <div>
                <h3 align="center" content="grey darken-1"> Selected Ingredients </h3>
                <v-data-table
                        :headers="headers1"
                        :items="ingredientListofSpecificPizza"
                        sort-by="orderPizzaDetailId"
                        sortDesc
                        class="elevation-5 orange lighten-5"
                >
                    <template v-slot:top>
                        <v-toolbar class="orange lighten-4">
                            <v-spacer></v-spacer>
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
            </div>
        </div>
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
                    text: 'Order Pizza Id',
                    align: 'start',
                    sortable: true,
                    value: 'orderPizzaId',
                    class: 'subtitle-1 font-weight-black'
                },
                {text: 'Pizza', value: 'pizzaName', class: 'subtitle-1 font-weight-black'},
                {text: 'Size (inch)', value: 'sizeInInch', class: 'subtitle-1 font-weight-black'},
                {text: 'Size', value: 'sizeInText', class: 'subtitle-1 font-weight-black'},
                {text: 'Slice', value: 'totalSlice', class: 'subtitle-1 font-weight-black'},
                {text: 'Total Price', value: 'totalPrice', class: 'subtitle-1 font-weight-black'},
                {text: 'Customer', value: 'customerName', class: 'subtitle-1 font-weight-black'},
                {text: 'Email', value: 'email', class: 'subtitle-1 font-weight-black'},
                {text: 'Phone', value: 'phone', class: 'subtitle-1 font-weight-black'},
                {text: 'Order-Date', value: 'orderDate', class: 'subtitle-1 font-weight-black'},
                {text: 'Required-Date', value: 'requiredDate', class: 'subtitle-1 font-weight-black'},
                {text: 'Canceled', value: 'canceled', class: 'subtitle-1 font-weight-black'},
                {text: 'Actions', value: 'actions', sortable: false, class: 'subtitle-1 font-weight-black'},
            ],
            cancelItems: [{
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
                orderPizzaId: 0,
                pizzaId: 0,
                customerId: 0,
                quantity: 0,
                discount: 0,
                totalPrice: 0.0,
                orderDate: '',
                requiredDate: '',
                shippedDate: '',
                shipVia: 0,
                canceled: false,
                email: '',
                phone: '',
                pizzaName: '',
                customerName: '',
                sizeInInch: 0,
                sizeInText: '',
                totalSlice: 0,

                orderPizzaDetailId: 0,
            },
            defaultItem: {
                orderPizzaId: 0,
                pizzaId: 0,
                customerId: 0,
                quantity: 0,
                discount: 0,
                totalPrice: 0.0,
                orderDate: '',
                requiredDate: '',
                shippedDate: '',
                shipVia: 0,
                canceled: false,
                email: '',
                phone: '',
                pizzaName: '',
                customerName: '',
                sizeInInch: 0,
                sizeInText: '',
                totalSlice: 0,

                orderPizzaDetailId: 0,
            },
            //"2nd table"
            headers1: [
                {
                    text: 'Order Pizza Id',
                    align: 'start',
                    sortable: true,
                    value: 'orderPizzaId',
                    class: 'subtitle-1 font-weight-black'
                },
                {text: 'Ingredient', value: 'ingredientName', class: 'subtitle-1 font-weight-black'},
                {text: 'Regional ProvinceNamee', value: 'regionalProvinceName', class: 'subtitle-1 font-weight-black'},
                {text: 'Created-Date', value: 'createdDate', class: 'subtitle-1 font-weight-black'},
                {text: 'Actions', value: 'actions', sortable: false, class: 'subtitle-1 font-weight-black'},
            ],
            ingredientListofSpecificPizza: [],
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Baker-Ingredient' : 'Cancel order'
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
                this.getMainList()
            },

            getMainList() {
                http
                    .get("/orderPizza")
                    .then(response => {
                        this.mainList = response.data;
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
                this.editedIndex = this.ingredientListofSpecificPizza.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm() {
                http
                    .delete("/orderPizzaDetail/" + this.editedItem.orderPizzaDetailId)
                    .then(response => {
                        var result = response.data;
                        if (result == 1) {
                            //this.mainList.splice(this.editedIndex, 1)
                            this.orderPizzaDetailByOrderPizzaId(this.editedItem.orderPizzaId);
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
                        .post("/orderPizzaCancel", this.editedItem)
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

            showItem(item) {
                this.orderPizzaDetailByOrderPizzaId(item.orderPizzaId);
            },

            orderPizzaDetailByOrderPizzaId(oderPizzaId) {
                http
                    .get("/orderPizzaDetailByPizzaId/" + oderPizzaId)
                    .then(response => {
                        this.ingredientListofSpecificPizza = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
        },
    }
</script>
