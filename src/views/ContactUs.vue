<template>
    <v-container mt-10>
        <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
                <v-card>
                    <v-flex class="orange lighten-3">
                        <v-col align="center">
                            <h1>Contact US</h1>
                        </v-col>
                    </v-flex>
                    <v-card-text class="orange lighten-4">
                        <v-container>
<!--                            <form @submit.prevent="postContent">-->
                            <form>
                            <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                >

                                    <v-text-field
                                            label="Put your email address here"
                                            solo
                                            v-model="feedback.email"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                        cols="12"
                                        sm="12"
                                        md="12"
                                >
                                    <v-textarea
                                            solo
                                            name="input-7-4"
                                            label="Your text..."
                                            v-model="feedback.content"
                                    ></v-textarea>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-layout>
                                    <v-flex>
                                        <v-col align="right">
                                            <v-btn type="submit"
                                                   align="right"
                                                   elevation="5"
                                                   class="success">Post your message</v-btn>
                                        </v-col>
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
                feedback: {
                    email: '',
                    content: '',
                },
            }
        },
        components: {},
        methods: {
            postComment() {
                console.log("succeed");
                // http
                //     .post("/feedback", this.feedback)
                //     .then(response => {
                //         var result = response.data;
                //         if (result == 1) {
                //             this.getBakerList();
                //         }
                //     })
                //     .catch(e => {
                //         console.log(e);
                //     });
            }
        }
    }
</script>

<style scoped>

</style>

