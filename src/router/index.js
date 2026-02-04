import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login.vue";
import Dashboard from "@/components/UserDashboard.vue";
import { getUser } from "@/services/auth";
import Register from "@/components/RegistrationPage.vue"
import UpdateDonarDetails from "@/components/UpdateDonarDetails.vue"

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
      path: "/dashboard",
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/donars",
        component: UpdateDonarDetails,
        
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !getUser()) {
    next("/login");
  } else {
    next();
  }
});

export default router;