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
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <!--navbar-->
        <v-app-bar app dense dark class="red">
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
            </v-toolbar-items>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app class="red">
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
            menuItems: [
                {icon: 'mdi-pizza', title: 'Pizza', link: '/Pizza'},
                {icon: 'mdi-dice-5', title: 'Ingredient', link: '/IngredientDetail'}
            ],
            footerItems: [
                {icon: 'mdi-emoticon-happy-outline', title: 'About Us', link: '/AboutUs'},
                {icon: 'mdi-contactless-payment', title: 'Contact Us', link: '/ContactUs'}
            ],

            icon: {
                mdiMenu
            },
            group: null
        }),
    };
</script>


