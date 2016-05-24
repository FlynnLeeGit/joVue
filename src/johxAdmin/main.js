import Vue from 'vue'
import App from './App'
import VueAsyncData from 'vue-async-data'
import VueRouter from 'vue-router'
// 组件引入
import UserInfo from './views/user/UserInfo'
import CardInfo from './views/card/CardInfo'


// 过滤器
import './filters/filters'

//网站图标
import './favicon.ico'

Vue.use(VueAsyncData)
Vue.use(VueRouter)

Vue.config.debug = true
const router = new VueRouter({
  saveScrollPosition: true
})
router.map({ // 路由数
  '/UserInfo': {
    name: 'UserInfo',
    component: UserInfo
  },
  '/CardInfo': {
    name: 'CardInfo',
    component: CardInfo
  },
})
router.beforeEach(() => {
  // window.scrollTo(0, 0)
})
router.redirect({
  '*': '/UserInfo'
})
router.start(App, '#app')
