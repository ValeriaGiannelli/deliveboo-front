import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Restaurant from '../views/Restaurant.vue';
import Checkout from '../views/Checkout.vue';
import NotFound from '../components/NotFound.vue';
import About from '../views/About.vue';

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
            path: '/chi-siamo',
            name: 'about',
            component: About,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: NotFound,
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 }; // Scroll to the top of the page on route change
        }
    },
});

export { router };
