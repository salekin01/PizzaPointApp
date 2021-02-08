<template>
    <v-container>
        <v-layout row v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onSignIn">
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="email"
                                                label="E-Mail"
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
                                        <v-btn type="submit">Sign In</v-btn>
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
    //import http from "../http-common";
    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        computed: {
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
            onSignIn () {
                this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
            },
            onDismissed () {
                this.$store.dispatch('clearError')
            }
        }
        // ,
        // methods: {
        //     onSignIn () {
        //         //this.$index.dispatch('signIn', {email: this.email, password: this.password})
        //         const authUser = {}
        //         var app = this;
        //         this.login(this.SignIn)
        //             .then(function(res) {
        //                 if(res.roleId > 0) {    //if(res.status === "success")
        //                     authUser.data = res;
        //                     //authUser.token = res.token;
        //                     app.$store.state.isLoggedIn = true
        //                     window.localStorage.setItem('lbUser',JSON.stringify(authUser));
        //                     if(authUser.data.roleId === '1') {    //role_id 1 is Baker, role_id 2 is Customer
        //                         app.$router.push('/Baker');
        //                     }else {
        //                         app.$router.push('/Customer');
        //                     }
        //                 }else {
        //                     app.$store.state.isLoggedIn = false;
        //                 }
        //             })
        //             .catch(function (err){
        //                 console.log(err.data)
        //             })
        //     },
        //     loginAuth() {
        //         var app = this;
        //         const status =  JSON.parse(window.localStorage.getItem('lbUser'));
        //         if(status === null || status === undefined) {
        //             app.$router.push('/SignIn');
        //         }
        //         else if (status.data.role_id === '1') {
        //             app.$router.push('/Baker');
        //         }else {
        //             app.$router.push('/Customer');
        //         }
        //     },
        //     login(value) {
        //         return new Promise(function (resolve, reject) {
        //             http
        //                 .post("/SignIn", value)
        //                 .then(function (res) {
        //                     resolve(res.data);
        //                 })
        //                 .catch(function (err) {
        //                     reject(err.response.data)
        //                 })
        //             });
        //     }
        // },
        // created:function() {
        //     this.loginAuth();
        // }
    }
</script>
