import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Restaurant from '../views/Restaurant.vue';
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
        }

    ]
});
export { router };