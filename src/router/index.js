import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Pizza from '../views/Pizza.vue'
import IngredientDetail from '../views/IngredientDetail.vue'
import Baker from '../views/Baker.vue'
import BakerGoods from '../views/BakerGoods.vue'
import AboutUs from '../views/AboutUs.vue'
import ContactUs from '../views/ContactUs.vue'
import SignIn from '../views/SignIn.vue'
import SignUpUser from '../views/SignUpUser.vue'
import Customer from '../views/Customer.vue'
import Supplier from '../views/Supplier.vue'
import SupplierGoods from '../views/SupplierGoods.vue'
import AuthGuard from '../router/auth-guard.js'


//import {store} from '@/store/index';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/Pizza',
        name: 'Pizza',
        component: Pizza,
        beforeEnter: AuthGuard
    },
    {
        path: '/Supplier',
        name: 'Supplier',
        component: Supplier,
        beforeEnter: AuthGuard
    },
    {
        path: '/SupplierGoods',
        name: 'Supplier-Ingredients',
        component: SupplierGoods,
        beforeEnter: AuthGuard
    },
    {
        path: '/IngredientDetail',
        name: 'Ingredient-Detail',
        component: IngredientDetail,
        beforeEnter: AuthGuard
        //meta: { requiresAuth: true , adminAuth:true , customerAuth : false}
    },
    {
        path: '/Baker',
        name: 'Baker',
        component: Baker,
        beforeEnter: AuthGuard
        //meta: { requiresAuth: true , adminAuth:true , customerAuth : false}
    },
    {
        path: '/BakerGoods',
        name: 'Baker-Ingred.',
        component: BakerGoods,
        beforeEnter: AuthGuard
        //meta: { requiresAuth: true , adminAuth:true , customerAuth : false}
    },
    {
        path: '/Customer',
        name: 'Customer',
        component: Customer,
        beforeEnter: AuthGuard
        //meta: { requiresAuth: true , adminAuth:false , customerAuth : true}
    },
    {
        path: '/AboutUs',
        name: 'About Us',
        component: AboutUs
    },
    {
        path: '/ContactUs',
        name: 'Contact Us',
        component: ContactUs
    },
    {
        path: '/SignIn',
        name: 'Sign In',
        component: SignIn
    },
    {
        path: '/SignUpUser',
        name: 'Sign Up',
        component: SignUpUser
    }
]

const router = new VueRouter({
    mode: 'history',
    //base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//         if (this.$store.getters.isAuthenticated) {
//             next();
//             return;
//         }
//         next("/login");
//     } else {
//         next();
//     }
// });
//
// router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.guest)) {
//         if (this.$store.getters.isAuthenticated) {
//             next("/posts");
//             return;
//         }
//         next();
//     } else {
//         next();
//     }
// });

// router.beforeEach((to, from, next) => {
//     if(to.meta.requiresAuth) {
//         if(store.getters.user == null || store.getters.user == undefined) {
//             next('/');
//             return;
//         }
//         else if(to.meta.adminAuth) {
//             if(store.user.roleId === '1') {     //role_id 1 is Baker
//                 next();
//                 return;
//             }else {
//                 next('/SignIn')
//             }
//         } else if(to.meta.customerAuth) {
//             if(store.user.roleId === '2') {     //role_id 2 id Customer
//                 next('/Customer');
//                 return;
//             }
//             else {
//                 next('/SignIn');
//             }
//         }
//     }else {
//         next()
//     }
// })


export default router
