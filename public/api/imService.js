import { joFetch } from 'jo'

const imServer = `${window.config.server}/im`
export default {
  /** [getAccount im后台中根据visitorImId(其实就是mobile和orderPhone手机号) 获得用户信息和订单信息] */
  getAccount(visitorImId) {
    return joFetch.post(`${imServer}/crm`, { visitorImId })
      .then(res => res.hxInfoDto)
  }
}
