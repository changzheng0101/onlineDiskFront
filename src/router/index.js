
import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: '/',
        name: "Home",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Home/index.vue"),
        meta: {
            requireAuth: true
        },
    },
    {
        path: "/login", //  登录页面
        name: "Login",
        component: () =>
            import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    },
    {
        path: "/register", //  注册页面
        name: "Register",
        component: () =>
            import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    },
    {
        path: "/:catchAll(.*)", //  404页面
        name: "Error_404",
        component: () =>
            import(/* webpackChunkName: "error_404" */ "../views/Error_404.vue"),
    },

];

const router = new createRouter({
    routes,// (缩写) 相当于 routes: routes
    history: createWebHistory(),
    base: process.env.BASE_URL
})

export default router;
