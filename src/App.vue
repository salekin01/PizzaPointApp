<template>
    <v-app>
        <!--side navbar-->
        <v-navigation-drawer v-model="sideNav" absolute temporary>
            <v-list nav dense>
                <v-list-item-group v-model="group">
                    <v-list-item v-for="item in menuItems" :key="item.title"
                                 router :to="item.link">
                        <v-icon role="img">{{item.icon}}</v-icon>
                        <v-list-item-title>{{item.title}}</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="userIsAuthenticated"
                                 @click="onLogout">
                        <v-icon role="img">mdi-exit-to-app</v-icon>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <!--navbar-->
        <v-app-bar app dark class="deep-orange accent-2" height="70">
            <v-app-bar-nav-icon @click="sideNav = true" class="hidden-sm-and-up">
                <v-icon role="img">mdi-menu</v-icon>
            </v-app-bar-nav-icon>

            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer" > <h2>PizzaPoint</h2></router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn text
                       v-for="item in menuItems" :key="item.title"
                       router :to="item.link"
                >
                    <v-icon role="img">{{item.icon}}</v-icon>
                    {{item.title}}
                </v-btn>
                <v-btn text
                       v-if="userIsAuthenticated"
                       @click="onLogout"
                >
                    <v-icon role="img">mdi-exit-to-app</v-icon>
                    Logout
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <div background-color="light-blue">
                    <router-view></router-view>
                </div>

            </v-container>
        </v-main>

        <v-footer app class="deep-orange accent-2" height="60">
            <v-row justify="center">
                <v-btn
                        v-for="item in footerItems" :key="item.title"
                        router :to="item.link"
                        color="white"
                        text
                        rounded
                        class="my-2"
                >
                    <v-icon role="img">{{item.icon}}</v-icon>
                    {{item.title}}
                </v-btn>
            </v-row>
        </v-footer>
    </v-app>
</template>

<script>
    //import HelloWorld from './components/HelloWorld';
    import {mdiMenu} from '@mdi/js';

    export default {
        name: 'App',
        components: {
            //HelloWorld,
        },

        data: () => ({
            sideNav: false,
            icon: {
                mdiMenu
            },
            group: null
        }),
        computed: {
            menuItems() {
                let menuItems = [
                    {icon: 'mdi-lock', title: 'Sign-Up', link: '/SignUpBaker'},
                    {icon: 'mdi-face-agent', title: 'Sign Up', link: '/SignUpUser'},
                    {icon: 'mdi-login', title: 'Sign In', link: '/SignIn'}
                ]
                if (this.userIsAuthenticated && this.$store.getters.user.roleId == 1) {        //roleId == 1 == Baker
                    menuItems = [
                        {icon: 'mdi-dice-5', title: 'Ingredients', link: '/IngredientDetail'},
                        {icon: 'mdi-account-group', title: 'Supplier', link: '/Supplier'},
                        {icon: 'mdi-arrow-decision-outline', title: 'Supplier-Ingred.', link: '/SupplierGoods'},
                        {icon: 'mdi-chef-hat', title: 'Baker', link: '/Baker'},
                        {icon: 'mdi-beaker-plus-outline', title: 'Baker-Ingred.', link: '/BakerGoods'},
                        {icon: 'mdi-pizza', title: 'Pizza', link: '/Pizza'},
                        {icon: 'mdi-clipboard-list-outline', title: 'Customer-Order', link: '/CustomerOrder'}
                    ]
                }
                if (this.userIsAuthenticated && this.$store.getters.user.roleId == 2){         //roleId == 2 == Customer
                    menuItems = [
                        {icon: 'mdi-account', title: 'Profile', link: '/Customer'}
                    ]
                }
                return menuItems
            },
            footerItems() {
                let footerItems = [
                    {icon: 'mdi-emoticon-happy-outline', title: 'About Us', link: '/AboutUs'},
                    {icon: 'mdi-contactless-payment', title: 'Contact Us', link: '/ContactUs'}
                ]
                return footerItems
            },
            userIsAuthenticated() {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            }
        },
        methods: {
            onLogout () {
                this.$store.dispatch('logout');
                this.$router.push('/').catch(()=>{});
            }
        }
    };
</script>

<style>
    .v-data-table > .v-data-table__wrapper > table > thead > tr > th{
        font-size: 20px !important;
    }
    .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
        font-size: 18px !important;
    }
    .v-data-table > .v-data-footer  {
        font-size: 18px !important;
    }
</style>
