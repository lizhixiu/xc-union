import {createRouter, createWebHistory} from 'vue-router';
// 导入页面组件
import Home from '../views/home.vue';
import Tbk from '../views/tbk.vue';
import Jd from '../views/jd.vue';

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
    },
    {
        path: '/jd',
        name: 'Jd',
        component: Jd
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;