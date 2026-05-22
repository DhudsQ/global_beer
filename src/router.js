/**
 * Application router.
 * @summary Defines all navigation routes and the global beforeEach guard.
 * @author Student
 */
import { createRouter, createWebHistory } from 'vue-router';
import HomeView      from './sales/presentation/views/home.vue';
import salesRoutes   from './sales/presentation/sales-routes.js';

const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

const routes = [
    { path: '/home',            name: 'home',      component: HomeView,   meta: { title: 'Home' } },
    { path: '/sales/orders',    name: 'sales',     children: salesRoutes },
    { path: '/',                redirect: '/home' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: pageNotFound, meta: { title: 'Page Not Found' } }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `Global Beer Network - ${to.meta['title'] ?? ''}`;
    return next();
});

export default router;
