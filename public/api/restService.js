import { joFetch } from 'jo'

const restServer = `${window.config.server}/restaurant`
export default {
  /** [getRests 自定义餐厅字段中的餐厅列表] */
  getRests() {
    return joFetch.post(`${restServer}`)
  }
}
