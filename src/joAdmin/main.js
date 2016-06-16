import Vue from 'vue'
import App from './App'
import VueAsyncData from 'vue-async-data'
import VueRouter from 'vue-router'
/** 路由地图 */
import routerMap from './routes/routerMap.js'

Vue.use(VueRouter)
Vue.use(VueAsyncData)
import { limitPage, orderByChs, orderTypeToString } from './filters/filters'

Vue.filter('limitPage', limitPage)
Vue.filter('orderByChs', orderByChs)
Vue.filter('orderTypeToString', orderTypeToString)


Vue.config.debug = process.env.DEBUG


const router = new VueRouter()
router.map(routerMap)
router.beforeEach(() => {
  window.scrollTo(0, 50)
})
router.redirect({
  '*': '/OrderList'
})
router.start(App, '#app')
