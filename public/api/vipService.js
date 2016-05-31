import { joFetch } from 'jo'

const vipServer = `${window.config.server}/vip`
export default {

  /** [vip Section>Member] */
  //获取所有会员列表
  getVips() {
      return joFetch.post(`${vipServer}/select`)
        .then(res => res.list)
    },
    //插入会员
    insertVip(memberData) {
      return joFetch.post(`${vipServer}/member/update`, { member: JSON.stringify(memberData) })
    },
    //更新会员
    updateVip(memberData) {
      return this.insertVip(memberData)
    },

    /** [partner Section>Partner] */
    //获取所有合作商
    getPartners() {
      return joFetch.post(`${vipServer}/partner/select`)
        .then(res => res.list)
    },
    //删除合作商
    deletePartner(partnerId) {
      return joFetch.delete(`${vipServer}/partner/delete`, { partnerId })
    },
    //插入合作商
    insertPartner(partnerObj) {
      return joFetch.post(`${vipServer}/partner/insert`, { partner: JSON.stringify(partnerObj) })
    },
    //更新合作商
    updatePartner(partnerObj) {
      return joFetch.post(`${vipServer}/partner/update`, { partner: JSON.stringify(partnerObj) })
    },
    //获取单个合作商信息
    getOnePartner(partnerId) {
      return joFetch.post(`${vipServer}/partner/selectOne`, { partnerId })
        .then(res => JSON.parse(res.partner) || {})
    },

    /** [Section>getSerInfos ] */
    //获取所有服务
    getSerInfos() {
      return joFetch.post(`${vipServer}/serInfo/select`)
        .then(res => res.list)
    },
    //删除单个服务
    deleteSerInfo(serId) {
      return joFetch.delete(`${vipServer}/serInfo/delete`, { serId })
    },
    //新增一项服务
    insertSerInfo(serInfoJson) {
      return joFetch.post(`${vipServer}/serInfo/insert`, { serInfo: JSON.stringify(serInfoJson) })
    },
    //更新一项服务
    updateSerInfo(serId, serInfoJson) {
      return joFetch.post(`${vipServer}/serInfo/update`, { serId, serInfo: JSON.stringify(serInfoJson) })
    },
    //获取单个服务信息
    getOneSerInfo(serId) {
      return joFetch.post(`${vipServer}/serInfo/selectOne`, { serId })
        .then(res => JSON.parse(res.serInfo) || {})
    },

    /** [getPrivilege 根据参数获得用户支付卡片的特权信息] */
    getPrivilege(accountId, serId) {
      return joFetch.post(`${vipServer}/privilege/select`, { accountId, serId })
        .then(res => res.privilegeEntity)
    },

    /** [获得服务大分类列表] */
    getSerCate() {
      return joFetch.post(`${vipServer}/auto/serviceCategory`)
        .then(res => res.list)
    },

    /** [获得会员特权等级列表] */
    getSimple() {
      return joFetch.post(`${vipServer}/simple/select`)
        .then(res => res.list)
    },

    /** [绑定优惠券的会员] */
    couponBind(coupJson) {
      return joFetch.post(`${vipServer}/bind`, { coupon: JSON.stringify(coupJson) })

    },
}
