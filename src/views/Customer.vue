<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-flex class="orange lighten-3">
                    <v-col align="center">
                        <h1>My Profile</h1>
                        <v-icon role="img" x-large>mdi-account</v-icon>
                    </v-col>
                </v-flex>
                <v-card class="orange lighten-4">
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignUp">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="customerName"
                                                label="Name"
                                                id="customerName"
                                                v-model="Customer.customerName"
                                                type="text"
                                                readonly></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="address"
                                                label="Address"
                                                id="address"
                                                v-model="Customer.address"
                                                type="text"
                                                readonly></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="email"
                                                label="Mail"
                                                id="email"
                                                v-model="Customer.email"
                                                type="email"
                                                readonly></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="phone"
                                                label="Phone"
                                                id="phone"
                                                v-model="Customer.phone"
                                                type="text"
                                                readonly
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="shippingInfo"
                                                label="Shipping Info"
                                                id="shippingInfo"
                                                v-model="Customer.shippingInfo"
                                                type="text"
                                                readonly
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="password"
                                                label="Password"
                                                id="password"
                                                v-model="Customer.password"
                                                type="password"
                                                readonly></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="crearedDate"
                                                label="Creadted Date"
                                                id="crearedDate"
                                                v-model="Customer.crearedDate"
                                                type="text"
                                                readonly></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import http from "../http-common";

    export default {
        data() {
            return {
                Customer: {
                    customerName: '',
                    address: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    shippingInfo: '',
                    createdDate:'',
                },
            }
        },
        computed: {
            comparePasswords() {
                return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
            }
            ,
            user() {
                return this.$store.getters.user
            },
            error() {
                return this.$store.getters.error
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        watch: {
            user(value) {
                if (value !== null && value !== undefined) {
                    this.$router.push('/')
                }
            }
        },
        created() {
            this.getCustomer();
        },
        methods: {
            getCustomer() {
                http
                    .get("/customerByEmailId/" + this.$store.getters.user.email)
                    .then(response => {
                        this.Customer = response.data;
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
        },
    }
</script>
