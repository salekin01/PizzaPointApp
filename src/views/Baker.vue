<template>
    <v-data-table
            :headers="headers"
            :items="bakerList"
            sort-by="bakerId"
            sortDesc
            class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat>
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
                                            cols="12"
                                            sm="6"
                                            md="4"
                                    >
                                        <v-text-field
                                                v-model="editedItem.bakerName"
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
                    color="primary"
                    @click="initialize"
            >
                Reset
            </v-btn>
        </template>
    </v-data-table>
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
                    value: 'bakerName',
                },
                {text: 'Address', value: 'address'},
                {text: 'Phone', value: 'phone'},
                {text: 'Email', value: 'email'},
                {text: 'Created Date', value: 'createdDate'},
                {text: 'Updated Date', value: 'updatedDate'},
                {text: 'Actions', value: 'actions', sortable: false},
            ],
            bakerList: [],
            editedIndex: -1,
            editedItem: {
                bakerName: '',
                address: '',
                phone: '',
                email: '',
                createdDate: '',
            },
            defaultItem: {
                bakerName: '',
                address: '',
                phone: '',
                email: '',
                createdDate: '',
            },
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Baker' : 'Edit Baker'
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
                this.getBakerList()
            },

            getBakerList() {
                http
                    .get("/baker")
                    .then(response => {
                        this.bakerList = response.data; // JSON are parsed automatically.
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },

            editItem(item) {
                console.log(item);
                this.editedIndex = this.bakerList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem(item) {
                this.editedIndex = this.bakerList.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },

            async deleteItemConfirm() {
                await http
                    .delete("/baker/" + this.editedItem.bakerId)
                    .then(response => {
                        var result = response.data;
                        if (result == 1) {
                            this.bakerList.splice(this.editedIndex, 1)
                            this.getBakerList();
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
                    //Object.assign(this.bakerList[this.editedIndex], this.editedItem)
                    http
                        .post("/baker/" + this.editedItem.bakerId, this.editedItem)
                        .then(response => {
                            var result = response.data;
                            if (result == 1) {
                                this.getBakerList();
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
                //new item
                else {
                    //this.bakerList.push(this.editedItem)
                    http
                        .post("/baker", this.editedItem)
                        .then(response => {
                            var result = response.data;
                            if (result == 1) {
                                this.getBakerList();
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
