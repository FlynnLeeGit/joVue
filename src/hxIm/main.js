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
        auth: false,
      }
    }
  }
})
router.beforeEach(() => {


})
router.redirect({
  '*': '/admin'
})
router.start(App, '#app')
