import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/404'
import Login from '../views/Login'
import Register from "../views/Register";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      isLogin: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isLogin: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      isLogin: false
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: {
      isLogin: false
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
