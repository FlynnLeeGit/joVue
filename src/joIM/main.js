import Vue from 'vue'
import App from './App'
import VueAsyncData from 'vue-async-data'
import VueRouter from 'vue-router'
// 组件引入
import userLogin from './views/login/userLogin'

// 过滤器
import './filters/filters'

//网站图标
import './favicon.ico'

Vue.use(VueAsyncData)
Vue.use(VueRouter)

Vue.config.debug = true
const router = new VueRouter()
router.map({ // 路由数
  '/userLogin': {
    name: 'userLogin',
    component: userLogin
  },
})
router.beforeEach(() => {
  window.scrollTo(0, 0)
})
router.redirect({
  '*': '/userLogin'
})
router.start(App, '#app')
