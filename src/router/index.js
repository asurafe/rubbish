import VueRouter from "vue-router";
import Vue from "vue"

Vue.use(VueRouter);

const routes = [
    {
        path: '/blackList',
        component: () => import('../pages/blackList/index.vue')
    }, {
        path: '/userPortrait',
        component: () => import('../pages/userPortrait/index.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router