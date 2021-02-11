<template >
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-flex class="orange lighten-3">
                    <v-col align="center">
                        <h1>Sign-UP Baker</h1>
                        <v-icon role="img" x-large>mdi-account-tie</v-icon>
                    </v-col>
                </v-flex>
                <v-card class="orange lighten-4">
                    <v-card-text >
                        <v-container >
                            <form @submit.prevent="onSignUp">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="bakerName"
                                                label="Name"
                                                id="bakerName"
                                                v-model="bakerName"
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
                                                v-model="address"
                                                type="text"
                                                ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="phone"
                                                label="Phone"
                                                id="phone"
                                                v-model="phone"
                                                type="text"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="email"
                                                label="Mail"
                                                id="email"
                                                v-model="email"
                                                type="email"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="password"
                                                label="Password"
                                                id="password"
                                                v-model="password"
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
                                                v-model="confirmPassword"
                                                type="password"
                                                :rules="[comparePasswords]"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-btn type="submit" block  large
                                               outlined
                                               elevation="2"
                                               rounded class="orange lighten-5"
                                        >Submit</v-btn>
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
    export default {
        data() {
            return {
                bakerName: '',
                address: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
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
        methods: {
            onSignUp() {
                this.$store.dispatch('signBakerUp', {
                    bakerName: this.bakerName, address: this.address,
                    phone: this.phone, email: this.email, password: this.password
                })
                this.$router.push('/');
                //this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
            }
        }
    }
</script>
