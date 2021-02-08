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
        <v-app-bar app dense dark class="deep-orange accent-2">
            <v-app-bar-nav-icon @click="sideNav = true" class="hidden-sm-and-up">
                <v-icon role="img">mdi-menu</v-icon>
            </v-app-bar-nav-icon>

            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer">PizzaPoint</router-link>
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

        <v-footer app class="deep-orange accent-2">
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
                    {icon: 'mdi-face-recognition', title: 'Sign Up', link: '/SignUpUser'},
                    {icon: 'mdi-login', title: 'Sign In', link: '/SignIn'}
                ]
                if (this.userIsAuthenticated) {
                    menuItems = [
                        {icon: 'mdi-pizza', title: 'Pizza', link: '/Pizza'},
                        {icon: 'mdi-dice-5', title: 'Ingredient', link: '/IngredientDetail'},
                        {icon: 'mdi-chef-hat', title: 'Baker', link: '/Baker'},
                        {icon: 'mdi-face-agent', title: 'SignUp-Baker', link: '/SignUpBaker'}
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
                this.$store.dispatch('logout')
            }
        }
    };
</script>

