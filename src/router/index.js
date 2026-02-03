import {createRouter, createWebHistory} from "vue-router";
import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import { getUser } from "@/services/auth";

const routes = [
    {path: "/login", component: Login},
    {path: "/dashboard", component: Dashboard, meta: {requiresAuth: true}}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !getUser())
    {
        next("/login");
    }
    else {
        next();
    }
});

export default router;