import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: () => import("./components/Login")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./components/Register")
    },
    {
      path: "/times",
      name: "times",
      component: () => import("./components/Times")
    },
    {
      path: "/times/:id",
      name: "time-upd",
      component: () => import("./components/TimeUpd")
    },
    {
      path: "/add",
      name: "time-add",
      component: () => import("./components/TimeAdd")
    }
  ]
});