<template>
    <div>
        <v-layout row wrap>
            <v-carousel
                    cycle
                    height="500"

                    show-arrows-on-hover
            >
                <v-carousel-item
                        eager
                        v-for="(slide, i) in slides"
                        :key="i"
                        :src="slide.src"
                >
                </v-carousel-item>
            </v-carousel>
            <v-flex xs8 class="orange lighten-5">
                <v-flex ma-1
                        v-for="(item, index) in basePizzaList"
                        :key="index">
                    <v-card class="orange lighten-5">
                        <v-container fluid>
                            <v-layout row>
                                <v-flex xs5 sm4 md3 fluid>
                                    <v-img :src="item.imageUrl"></v-img>
                                </v-flex>
                                <v-flex xs7 sm8 md9>
                                    <v-card-title primary-title>
                                        <div xs9 sm10 md11>
                                            <h3 class="Gray--text mb-0">{{item.pizzaName}}</h3>
                                            <h4 class="Gray--text mb-0">{{item.description}}</h4>
                                        </div>
                                        <v-spacer></v-spacer>
                                        <div xs3 sm2 md1>
                                            <h3>{{item.price}}€</h3>
                                        </div>
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-col class="text-right">
                                            <v-btn @click="selectBasePizza(item)">
                                                <v-icon center role="img">mdi-plus-thick</v-icon>
                                            </v-btn>
                                        </v-col>

                                    </v-card-actions>

                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-flex>
            <v-flex xs4 class="orange lighten-4">
                <v-col>
                    <v-card class="orange lighten-3">
                        <div>
                            <h2 align="center">Available Ingredients</h2>
                        </div>
                    </v-card>
                </v-col>
                <v-col ma-0>
                    <v-data-table
                            v-model="selected"
                            :headers="headers"
                            :items="bakerIngredientList"
                            item-key="bakerGoodsId"
                            show-select
                            class="orange lighten-5"
                    >
                    </v-data-table>
                </v-col>
                <v-col ma-0>
                    <v-btn
                            color="success"
                            dark
                            class="my-0"
                            v-on:click="orderPizzaClick"
                            large
                    >
                        Order Pizza
                    </v-btn>
                </v-col>
                <v-col>
                    <div>
                        <v-alert type="info" :value="alert">
                            {{this.message}}
                        </v-alert>

                    </div>
                </v-col>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    // @ is an alias to /src
    import http from "../http-common";

    export default {
        name: 'Home',
        data() {
            return {
                colors: [
                    'indigo',
                    'warning',
                    'pink darken-2',
                    'red lighten-1',
                    'deep-purple accent-4',
                ],
                slides: [
                    {
                        src: 'https://i.postimg.cc/XqNsD19h/pizza-Banner1.jpg',
                    },
                    {
                        src: 'https://i.postimg.cc/sXTY1jZ6/pizzabanner5.png',
                    },
                    {
                        src: 'https://i.postimg.cc/ZYfH5c8b/pizza-Banner3.png',
                    },
                    {
                        src: 'https://i.postimg.cc/VvTXBKgX/pizzabanner6.jpg',
                    },
                    {
                        src: 'https://i.postimg.cc/2SjBLRrg/pizza-Banner2.png',
                    },
                ],
                selected: [],
                headers: [
                    {
                        text: 'Ingredient',
                        align: 'start',
                        sortable: true,
                        value: 'ingredientName',
                        class: 'subtitle-1 font-weight-black',
                    },
                    {text: 'Regional Province', value: 'regionalProvinceName', class: 'subtitle-1 font-weight-black'},
                    {text: 'Price', value: 'unitPrice', class: 'subtitle-1 font-weight-black'},
                ],
                bakerIngredientList: [],
                basePizzaList: [],
                SelectedPizza: {
                    pizzaId: 0,
                    pizzaName: '',
                    pizzaSizeId: 0,
                    price: 0.0,
                    description: '',
                    quantity: 0,
                    discount: 0,
                    totalPrice: 0,
                    email: '',
                },
                alert: false,
                message: '',
                orderPizzaId: ''
            }
        },
        components: {},
        created() {
            setTimeout(() => {
                this.alert = false
            }, 10000),
                this.initialize()
        },
        methods: {
            initialize() {
                this.getBasePizzaList();
                this.getBakerIngredientList();
            },
            getBasePizzaList() {
                http
                    .get("/pizza")
                    .then(response => {
                        this.basePizzaList = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            selectBasePizza(item) {
                this.message = 'Base pizza selected.';
                this.alert = true;
                this.SelectedPizza.pizzaId = item.pizzaId;
                this.SelectedPizza.pizzaName = item.pizzaName;
                this.SelectedPizza.pizzaSizeId = item.pizzaSizeId;
                this.SelectedPizza.price = item.price;
                this.SelectedPizza.description = item.description;
                this.SelectedPizza.quantity = 1;

            },
            getBakerIngredientList() {
                http
                    .get("/bakerGoodsForCustomer")
                    .then(response => {
                        this.bakerIngredientList = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            orderPizzaClick() {
                if (this.$store.getters.user !== null && this.$store.getters.user !== undefined && this.$store.getters.user.roleId != null && this.$store.getters.user.roleId == 2) {
                    if (this.SelectedPizza != null && this.SelectedPizza.pizzaId > 0) {
                        this.SelectedPizza.email = this.$store.getters.user.email;
                        this.orderPizzaCreate();
                        this.reloadTable();
                    } else {
                        this.message = 'Select base pizza for order.'
                        this.alert = true;
                    }

                } else {
                    this.message = 'SignIn to place your order.'
                    this.alert = true;
                    this.$router.push('/').catch(() => {
                    });
                }

            },
            userIsAuthenticated() {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            totalPriceCalculate() {
                this.SelectedPizza.totalPrice = 0;
                this.SelectedPizza.totalPrice += this.SelectedPizza.price;
                var i = 0;
                for (i = 0; i < this.selected.length; i++) {
                    this.SelectedPizza.totalPrice += this.selected[i].unitPrice;
                }
            },
            orderPizzaCreate() {
                this.totalPriceCalculate();
                http
                    .post("/orderPizza", this.SelectedPizza)
                    .then(async response => {
                        this.orderPizzaId = await response.data;
                        this.orderPizzaDetailCreate();
                        this.message = 'Order has been placed successfully.'
                        this.alert = true;
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            orderPizzaDetailCreate() {
                var i = 0;
                for (i = 0; i < this.selected.length; i++) {
                    http
                        .post("/orderPizzaDetailByOrderedId/" + this.orderPizzaId, this.selected[i])
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
                this.getBasePizzaList();
                this.getBakerIngredientList();
            }
        }

    }
</script>
