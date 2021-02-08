<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
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
                                                required></v-text-field>
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
                                                required></v-text-field>
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
                                                required></v-text-field>
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
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                id="confirmPassword"
                                                v-model="Customer.confirmPassword"
                                                type="password"
                                                :rules="[comparePasswords]"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit">Sign Up</v-btn>
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
        data () {
            return {
                Customer : {
                    customerName: '',
                    address: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    shippingInfo: ''
                },
            }
        },
        computed: {
            comparePasswords () {
                return this.Customer.password !== this.Customer.confirmPassword ? 'Passwords do not match' : ''
            }
            // ,
            // user () {
            //     return this.$index.getters.user
            // }
        },
        watch: {
            user (value) {
                if (value !== null && value !== undefined) {
                    this.$router.push('/')
                }
            }
        },
        methods: {
            onSignUp () {
                http
                    .post("/customer", this.Customer)
                    .then(response => {
                        var result = response.data;
                        if (result == 1) {
                            this.$router.push('/');
                        }
                    })
                    .catch(e => {
                        console.log(e);
                    });
                //this.$index.dispatch('signUserUp', {email: this.email, password: this.password})
            }
        }
    }
</script>
