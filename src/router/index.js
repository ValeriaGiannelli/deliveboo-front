import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Restaurant from '../views/Restaurant.vue';
import Checkout from '../views/Checkout.vue';
import NotFound from '../components/NotFound.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/restaurant/:slug',
            name: 'restaurant',
            component: Restaurant,
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound
        },

    ]
});
export { router };