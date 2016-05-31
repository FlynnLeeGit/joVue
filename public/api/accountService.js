import { joFetch } from 'jo'
const accountServer = `${window.config.server}/account`
export default {
  /** [getAccounts 获取所有用户 可以传参查询] */
  getAccounts(searchObj) {
      return joFetch.post(`${accountServer}/list`, searchObj)
        .then(res => res.list)
    },
    getFeedbacks() {
      return joFetch.get(`${accountServer}/feedback/select`)
        .then(res => res.list)
    }
}
