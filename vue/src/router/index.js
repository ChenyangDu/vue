import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import NotFound from '../views/404'
import Login from '../views/Login'
import Register from '../views/Register'

import GetDocTest from "@/views/edit/GetDocTest";


import api from '@/http/api'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "Index",
      redirect: "/dashboard",
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        isLogin: false
      },
      children: [
        {
          path: '/dashboard',
          name: 'DashBoard',
          component: () => import('../views/dashboard'),
          meta: {
            isLogin: false,
            title: "系统首页"
          }
        },
        {
          path: '/personalinformation',
          name: 'PersonalInformation',
          component: () => import('../views/userInfo/PersonalInformation'),
          meta: {
            isLogin: true,
            title: "我的信息"
          }
        },
        {
          path: '/revising',
          name: 'Revising',
          component: () => import('../views/userInfo/Revising'),
          meta: {
            isLogin: true,
            title: "修改信息"
          }
        },
        {
          path: '/documentList',
          name: 'DocumentList',
          component: () => import('../views/DocumentList'),
          meta: {
            isLogin: true,
            title: "工作台"
          }
        },
        {
          path: '/groupdocumentlist',
          name: 'GroupDocumentList',
          component: () => import('../views/GroupDocumentList'),
          meta: {
            isLogin: true,
            title: "团队文档"
          }
        },
        {
          path: '/groupdetail',
          name: 'GroupDetail',
          component: () => import('../views/GroupDetail'),
          meta: {
            isLogin: true,
            title: "团队详情"
          }
        },
        {
          path: '/groupmember',
          name: 'GroupMember',
          component: () => import('../views/GroupMember'),
          meta: {
            isLogin: true,
            title: "团队成员"
          }
        },
        {
          path: '/grouplist',
          name: 'GroupList',
          component: () => import('../views/GroupList'),
          meta: {
            isLogin: true,
            title: "我的团队"
          }
        },
        {
          path: '/trash',
          name: 'Trash',
          component: () => import('../views/Trash'),
          meta: {
            isLogin: true,
            title: "回收站"
          }
        },
        {
          path: '/doceditor',
          name: 'DocEditor',
          component: () => import('../views/edit/DocEditor'),
          meta: {
            isLogin: true,
            title: "文档编辑"
          }
        },
        {
          path: '/docview',
          name: 'DocView',
          component: () => import('../views/edit/DocView'),
          meta: {
            isLogin: true,
            title: "文档查看"
          }
        },
        {
          path: '/noauthority',
          name: 'NoAuthority',
          component: () => import('../views/edit/NoAuthority')
        },
        {
          path: '/model',
          name: 'Model',
          component: () => import('../views/Model'),
          meta: {
            isLogin: true,
            title: "模板库"
          }
        }]
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
    },
    {
      path: '/getdoctest',
      name: 'GetDocTest',
      component: () => import('../views/edit/GetDocTest')
    },
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
