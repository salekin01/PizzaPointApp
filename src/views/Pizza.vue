
    <template>
        <v-data-table
                :headers="headers"
                :items="mainList"
                sort-by="pizzaId"
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
                                                    v-model="editedItem.pizzaName"
                                                    label="Name"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                no-gutters
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-select
                                                    :items="availablePizzaSize"
                                                    item-text="sizeInText"
                                                    item-value="pizzaSizeId"
                                                    v-model="editedItem.pizzaSizeId"
                                                    label="Size"
                                                    dense
                                            ></v-select>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.price"
                                                    label="Price"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.inStock"
                                                    label="In Stock"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.imageUrl"
                                                    label="Image Url"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                                cols="12"
                                                sm="6"
                                                md="4"
                                        >
                                            <v-text-field
                                                    v-model="editedItem.description"
                                                    label="Description"
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
                        text: 'Pizza',
                        align: 'start',
                        sortable: true,
                        value: 'pizzaName',
                        required: true,
                        class: 'subtitle-2 font-weight-black'
                    },
                    {text: 'Size', value: 'sizeInText', class: 'body font-weight-black'},
                    {text: 'Size (inch)', value: 'sizeInInch', class: 'subtitle-2 font-weight-black'},
                    {text: 'Slice', value: 'totalSlice', class: 'subtitle-2 font-weight-black'},
                    {text: 'Price', value: 'price', class: 'subtitle-2 font-weight-black'},
                    {text: 'In Stock', value: 'inStock', class: 'subtitle-2 font-weight-black'},
                    {text: 'Image Url', value: 'imageUrl', class: 'subtitle-2 font-weight-black'},
                    {text: 'Description', value: 'description', class: 'subtitle-2 font-weight-black'},
                    {text: 'Created Date', value: 'createdDate', class: 'subtitle-2 font-weight-black'},
                    {text: 'Updated date', value: 'updated_date', class: 'subtitle-2 font-weight-black'},
                    {text: 'Actions', value: 'actions', sortable: false, class: 'subtitle-2 font-weight-black'},
                ],
                mainList: [],
                availablePizzaSize: [],
                editedIndex: -1,
                editedItem: {
                    pizzaId: 0,
                    pizzaName: '',
                    pizzaSizeId: 0,
                    price: 0.0,
                    inStock: 0,
                    createdDate: '',
                    updatedDate: '',
                    imageUrl: '',
                    description: '',
                    sizeInInch: 0,
                    sizeInText: '',
                    totalSlice: 0,
                },
                defaultItem: {
                    pizzaId: 0,
                    pizzaName: '',
                    pizzaSizeId: 0,
                    price: 0.0,
                    inStock: 0,
                    createdDate: '',
                    updatedDate: '',
                    imageUrl: '',
                    description: '',
                    sizeInInch: 0,
                    sizeInText: '',
                    totalSlice: 0,
                },
            }),

            computed: {
                formTitle() {
                    return this.editedIndex === -1 ? 'New Pizza' : 'Edit Pizza'
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
                    this.getMainList(),
                    this.getAvailablePizzaSize()
                },

                getMainList() {
                    http
                        .get("/pizza")
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
                    this.editedIndex = this.mainList.indexOf(item)
                    this.editedItem = Object.assign({}, item)
                    this.dialogDelete = true
                },

                async deleteItemConfirm() {
                    await http
                        .delete("/pizza/" + this.editedItem.pizzaId)
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
                        //Object.assign(this.mainList[this.editedIndex], this.editedItem)
                        http
                            .post("/pizza/" + this.editedItem.pizzaId, this.editedItem)
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
                        //this.mainList.push(this.editedItem)
                        http
                            .post("/pizza", this.editedItem)
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
                getAvailablePizzaSize(){
                    http
                        .get("/pizzaSize")
                        .then(response => {
                            this.availablePizzaSize = response.data;
                            console.log(response.data);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            },
        }
    </script>

