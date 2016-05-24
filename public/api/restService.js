import { joFetch } from 'jo'
const restServer = `${window.server}/restaurant`
const restService = {
  /** [getRests 自定义餐厅字段中的餐厅列表] */
  getRests() {
    return joFetch.post(`${restServer}`)
  }
}
export default restService
