import Vue from 'vue'
import App from './App'
import VueAsyncData from 'vue-async-data'
import VueRouter from 'vue-router'
/** 路由地图 */
import routerMap from './routes/routerMap.js'

Vue.use(VueRouter)
Vue.use(VueAsyncData)
import { limitPage, orderByChs } from './filters/filters'

Vue.filter('limitPage', limitPage)
Vue.filter('orderByChs', orderByChs)

Vue.config.debug = process.env.DEBUG

// 过滤器


//网站图标
import './favicon.ico'

const router = new VueRouter()
router.map(routerMap)
router.beforeEach(() => {
  // window.scrollTo(0, 0)
})
router.redirect({
  '*': '/OrderList'
})
router.start(App, '#app')
