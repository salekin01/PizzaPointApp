<template>
    <v-app>

        <!--side navbar-->
        <v-navigation-drawer v-model="sideNav" temporary>
            <v-list>
                <v-list-item-group v-model="group">
                    <v-list-item>
                        <v-icon role="img">mdi-pizza</v-icon>
                        Pizza
                    </v-list-item>
                </v-list-item-group>
                <v-list-item-group>
                    <v-list-item>
                        <v-icon role="img">mdi-dice-5</v-icon>
                        Ingredient
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <!--navbar-->
        <v-app-bar class="red" app>
            <v-app-bar-nav-icon @click="sideNav = true" class="hidden-sm-and-up">
                <v-icon role="img">mdi-menu</v-icon>
            </v-app-bar-nav-icon>

            <v-toolbar-title>PizzaPoint</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn>
                    <v-icon role="img">mdi-pizza</v-icon>
                    Pizza
                </v-btn>
                <v-btn>
                    <v-icon role="img">mdi-dice-5</v-icon>
                    Ingredient
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <main>

        </main>
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
    };
</script>


