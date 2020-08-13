import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import NotFound from '../views/404'
import Login from '../views/Login'
import Register from '../views/Register'
import DocumentList from '../views/DocumentList'
import GroupDocumentList from '../views/GroupDocumentList'

// test用
import PersonalInformation from "../views/userInfo/PersonalInformation"
import Revising from "../views/userInfo/Revising"

import DocEditor from "@/views/edit/DocEditor";
import GetDocTest from "@/views/edit/GetDocTest";

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
        requireAuth: false
      }
    },
    // 以下为测试用 暂且写在这里
    {
      path: '/personalInformation',
      name: 'PersonalInformation',
      component: PersonalInformation,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/revising',
      name: 'Revising',
      component: Revising,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/doceditor',
      name: 'DocEditor',
      component: DocEditor,
    },
    {
      path: '/getdoctest',
      name: 'GetDocTest',
      component: GetDocTest
    },
    {
      path: '/documentlist',
      name: 'DocumentList',
      component: DocumentList
    },
    {
      path: '/groupdocumentlist',
      name: 'GroupDocumentList',
      component: GroupDocumentList
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let username = sessionStorage.getItem('username')
//   if (to.path === '/login') {
//     // 访问登录界面
//     if(username) {
//       // 已登录
//       next({ path: '/'})
//     } else {
//       next()
//     }
//   } else {
//     // 访问非登陆界面
//     if (!username) {
//       next({ path: '/login'})
//     } else {
//       next()
//     }
//   }
// })

export default router
