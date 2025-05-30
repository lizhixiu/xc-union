import {createRouter, createWebHistory} from 'vue-router';
// 导入页面组件
import Home from '../views/home.vue';
import Tbk from '../views/tbk.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/tbk',
        name: 'Tbk',
        component: Tbk
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;