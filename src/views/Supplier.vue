<template>
    <v-col>
        <v-data-table
                :headers="headers"
                :items="supplierList"
                sort-by="supplierId"
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
                                                    v-model="editedItem.supplierName"
                                                    label="Name"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.address"
                                                    label="Address"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.city"
                                                    label="City"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.postalCode"
                                                    label="Postal Code"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.phone"
                                                    label="Phone"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.email"
                                                    label="Email"
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
                                                    label="Hidden"
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
                    value: 'supplierName',
                    class: 'subtitle-2 font-weight-black'

                },
                {text: 'Address', value: 'address', class: 'subtitle-2 font-weight-black'},
                {text: 'City', value: 'city', class: 'subtitle-2 font-weight-black'},
                {text: 'Postal Code', value: 'postalCode', class: 'subtitle-2 font-weight-black'},
                {text: 'Phone', value: 'phone', class: 'subtitle-2 font-weight-black'},
                {text: 'Email', value: 'email', class: 'subtitle-2 font-weight-black'},
                {text: 'Hidden', value: 'hidden', class: 'subtitle-2 font-weight-black'},
                {text: 'Created Date', value: 'createdDate', class: 'subtitle-2 font-weight-black'},
                {text: 'Updated Date', value: 'updatedDate', class: 'subtitle-2 font-weight-black'},
                {text: 'Actions', value: 'actions', sortable: false, class: 'subtitle-2 font-weight-black'},
            ],
            hiddenItems: [{
                text: "TRUE",
                value: true
            },
                {
                    text: "FALSE",
                    value: false
                }],
            supplierList: [],
            editedIndex: -1,
            editedItem: {
                supplierId: 0,
                supplierName: '',
                address: '',
                city: '',
                postalCode: 0,
                phone: '',
                email: '',
                hidden: false
            },
            defaultItem: {
                supplierId: 0,
                supplierName: '',
                address: '',
                city: '',
                postalCode: 0,
                phone: '',
                email: '',
                hidden: false
            },
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Supplier' : 'Edit Supplier'
            },
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
                this.getSupplierList()
            },

            getSupplierList() {
                http
                    .get("/supplier")
                    .then(response => {
                        this.supplierList = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            editItem(item) {
                console.log(item);
                this.editedIndex = this.supplierList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                this.editedIndex = this.supplierList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            deleteItemConfirm() {
                http
                    .delete("/supplier/" + this.editedItem.supplierId)
                    .then(response => {
                        var result = response.data;
                        if (result == 1) {
                            //this.supplierList.splice(this.editedIndex, 1)
                            this.getSupplierList();
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
                    //Object.assign(this.supplierList[this.editedIndex], this.editedItem);
                    http
                        .post("/supplier/" + this.editedItem.supplierId, this.editedItem)
                        .then(response => {
                            var result = response.data;
                            if (result == 1) {
                                this.getSupplierList();
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                //new item
                else {
                    //this.supplierList.push(this.editedItem);
                    http
                        .post("/supplier", this.editedItem)
                        .then(response => {
                            var result = response.data;
                            if (result == 1) {
                                this.getSupplierList();
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                this.close()
            },
        },
    }
</script>
