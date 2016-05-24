import Vuex from 'vuex'
import Vue from 'vue'
import createLogger from 'vuex/logger'
Vue.use(Vuex)

const state = {
  alertState: {
    show: true,
    msg: ''
  },
  showUserDetail: false,
  showOrderDetail: false,
}
const mutations = {
  SHOW_USER_DETAIL(state) {
    state.showUserDetail = true
  },
  SHOW_ORDER_DETAIL(state) {
    state.showOrderDetail = true
  }
}
export default new Vuex.Store({
  state,
  mutations,
  strict: process.env.DEBUG ? true : false,
  middlewares: process.env.DEBUG ? [createLogger()] : []
})
