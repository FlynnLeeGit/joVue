import { joFetch } from 'jo'

const orderServer = `${window.config.server}/order`
export default {
  /** [订单查询 可包含查询参数] */
  getOrders(searchObj) {
      return joFetch.post(`${orderServer}/list`, searchObj)
        .then(res => res.list)
    },
    /** [getOrderDetail 获得自定义订单详情] */
    getOrderDetail(orderId) {
      return joFetch.post(`${orderServer}/detail`, { orderId })
        .then(res => JSON.parse(res.cardjson))
    },

    /** [修改订单状态] */
    updateDeal(orderId) {
      return joFetch.post(`${orderServer}/deal/status`, { orderId })
    },
    updateStatus(orderId, orderStatus) {
      return joFetch.post(`${orderServer}/status`, { orderId, orderStatus })
    },

    /** 获得会员订单列表 */
    getVipOrders(searchObj) {
      return joFetch.post(`${orderServer}/vip`, searchObj)
        .then(res => res.list)
    }
}
