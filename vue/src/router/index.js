import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import NotFound from '../views/404'
import Login from '../views/Login'
import Register from '../views/Register'

import api from '@/http/api'
import store from '../store'

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        requireAuth: false
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
})

// router.beforeEach((to, from, next) => {
//   let user = sessionStorage.getItem('user')
//   if (to.path === '/login') {
//     // 访问登录界面
//     if(user) {
//       // 已登录
//       next({ path: '/'})
//     } else {
//       next()
//     }
//   } else {
//     // 访问非登陆界面
//     if (!user) {
//       next({ path: '/login'})
//     } else {
//       next()
//     }
//   }
// })

export default router
