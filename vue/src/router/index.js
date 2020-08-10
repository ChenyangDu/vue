import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  // 首页我们需要默认空路径重定向到 home 下，避免空页面
  {
    path: "/",
    name: "home",
    redirect: "home",
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      index: 1,
    },
  },
  {
    path: "/category",
    name: "category",
    component: () =>
      import(/* webpackChunkName: "category" */ "../views/Category.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: "/user",
    name: "user",
    component: () => import(/* webpackChunkName: "user" */ "../views/User.vue"),
    meta: {
      index: 1,
    },
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue'),
    meta: {
      index: 2
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      index: 2
    }
  },
];

const router = new VueRouter({
  routes,
});

export default router;