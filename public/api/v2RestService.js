import { joFetch } from 'jo'


const v2RestServer = `${window.config.server}/v2/restaurant`
export default {
  // 获得所有餐厅
  getRests() {
      return joFetch.post(`${v2RestServer}/select`)
        .then(res => res.list)
    },
    // 插入餐厅
    insertRest(restJson) {
      return joFetch.post(`${v2RestServer}/insert`, { rest: JSON.stringify(restJson) })
    },
    // 获得一个餐厅信息
    getOneRest(restId) {
      return joFetch.post(`${v2RestServer}/selectOne`, { restId })
        .then(res => JSON.parse(res.rest))
    },
    // 更新餐厅
    updateRest(restJson) {
      return joFetch.post(`${v2RestServer}/update`, { rest: JSON.stringify(restJson) })
    },

    // 排序餐厅
    orderRest(orderJson) {
      return joFetch.post(`${v2RestServer}/order/by`, { orderBy: JSON.stringify(orderJson) })
    }
}
