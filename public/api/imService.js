import { joFetch } from 'jo'
const imServer = `${window.server}/im`
const imService = {
  /** [getAccount im后台中根据visitorImId(其实就是mobile和orderPhone手机号) 获得用户信息和订单信息] */
  getAccount(visitorImId) {
    return joFetch.post(`${imServer}/crm`, { visitorImId })
      .then(res => res.hxInfoDto)
  }
}

export default imService
