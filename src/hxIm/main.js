import Vue from 'vue'
import App from './App'
import VueAsyncData from 'vue-async-data'
import VueRouter from 'vue-router'
// 组件引入
import userLogin from './views/login/userLogin'
import admin from './views/admin'
import adminChat from './views/admin/adminChat'
// 过滤器
import './filters/filters'
import 'public/css/MaterialIcons.css'
import { conn } from './utils/easeim'

Vue.use(VueAsyncData)
Vue.use(VueRouter)

Vue.config.debug = true
const router = new VueRouter()
router.map({ // 路由数
  '/userLogin': {
    name: 'userLogin',
    component: userLogin
  },
  '/admin': {
    name: 'admin',
    component: admin,
    subRoutes: {
      '/': {
        name: 'adminChat',
        component: adminChat,
        auth: true,
      }
    }
  }
})
router.beforeEach((transition) => {
  if (transition.to.auth) {
    let token = JSON.parse(localStorage.getItem('token'))
    if (!token) {
      transition.redirect('/userLogin?redirect=' + transition.to.name)
    } else {
      conn.close()
      conn.open({ user: token.user, pwd: token.pwd, appKey: 'jotest#jotest' })
      return new Promise((resolve, reject) => {
        conn.onOpened = function() {
          log('登陆成功')
          conn.setPresence()
          resolve('h')
        }
        conn.onError = function(e) {
          transition.redirect('/userLogin?error=' + e.msg)
        }
      })
    }
  } else {
    transition.next()
  }
})
router.redirect({
  '*': '/admin'
})
router.start(App, '#app')
