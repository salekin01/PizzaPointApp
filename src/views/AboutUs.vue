<template>
    <v-container>
        <v-card class="orange lighten-5" >
            <v-container fluid mb-5>
                <v-layout row>
                    <v-flex xs5 sm4 md3 fluid>
                        <v-img :src="this.imageUrlSalekin"></v-img>
                    </v-flex>
                    <v-flex xs7 sm8 md9>
                        <v-card-title primary-title>
                            <div xs9 sm10 md11>
                                <h3 class="Gray--text mb-0">Sirajus Salekin Prodhan</h3>
                                <h6 class="Gray--text mb-0">Student of Master of Automotive Software Engineering</h6>
                                <h6 class="Gray--text mb-0">Student Assistant at Fraunhofer</h6>
                                <h6 class="Gray--text mb-0">Chemnitz, Saxony, Germany</h6>
                                <h6 class="Gray--text mb-0">Contact: psir@tu-chemnitz.de</h6>
                            </div>
                        </v-card-title>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <v-card class="orange lighten-5" >
            <v-container fluid>
                <v-layout row>
                    <v-flex xs7 sm8 md9>
                        <v-card-title primary-title>
                            <v-spacer></v-spacer>
                            <div xs9 sm10 md11>
                                <h3 class="Gray--text mb-0">Prova Akter</h3>
                                <h6 class="Gray--text mb-0">Student of Master of Automotive Software Engineering</h6>
                                <h6 class="Gray--text mb-0">Work student at pro-et-con Innovative Informatikanwendungen GmbH</h6>
                                <h6 class="Gray--text mb-0">Chemnitz, Saxony, Germany</h6>
                                <h6 class="Gray--text mb-0">Contact: akter@tu-chemnitz.de</h6>
                            </div>
                        </v-card-title>
                    </v-flex>
                    <v-flex xs5 sm4 md3 fluid>
                        <v-img :src="this.imageUrlProva"></v-img>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
    //import http from "../http-common";

    export default {
        data() {
            return {
                imageUrlSalekin: 'https://live.staticflickr.com/65535/50930428447_a411e45fcc_z.jpg',
                imageUrlProva: 'https://live.staticflickr.com/65535/50930975586_1e2c6394e4_o.jpg',
            }
        },
        computed: {
        },
        watch: {
        },
        created() {
        },
        methods: {
        },
    }
</script>



