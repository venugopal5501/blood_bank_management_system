import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/Login.vue";
import Dashboard from "@/components/UserDashboard.vue";
import { getUser } from "@/services/auth";
import Register from "@/components/RegistrationPage.vue";
import StockInventorys from "../views/StockInventorys.vue";
import UpdateDonarDetails from "../views/UpdateDashboard.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", component: Login },
    {
      path: "/dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/donars",
      component: UpdateDonarDetails,
    },
    {
      path: "/stocks",
      component: StockInventorys,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = getUser();
  const publicPages = ["/login", "/register"];
  if (!user && !publicPages.includes(to.path)) {
    next("/login");
  } else {
    next(); 
  }
});


export default router;
