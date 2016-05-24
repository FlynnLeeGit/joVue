const couponTableOpts = {
  columns: [
    { th: '编号', field: 'id' },
    { th: '供应商', field: 'partnerName' },
    { th: '优惠码', field: '' },
    { th: '优惠券名称', field: 'couponName' },
    { th: '品类(服务名)', field: 'serviceName' },
    { th: '用户类别', field: 'userLimit' },
    { th: '优惠金额', field: 'couponMoney' },
    { th: '条件金额', field: 'conditionMoney' },
    { th: '是否兑换', field: '' },
    { th: '是否失效', field: '' },
    { th: '是否失效', field: '' },
    { th: '有效期', field: 'availableMonths' },
  ]
}
const convertChange = (val) => {
  if (+val) {
    return `<button class='btn btn-xs btn-success'>已绑定会员</button>`
  } else {
    return `<button class='btn btn-xs' data-type='bind'>未绑定会员</button>`
  }
}
const businessCouponTableOpts = {
  nowrap: true,
  columns: [
    { th: '绑定状态切换', field: 'isBind', convert: convertChange },
    { th: '优惠券名称', field: 'cateName' },
    { th: '条件金额', field: 'conditionMoney' },
    { th: '优惠金额', field: 'couponMoney' },
    { th: '餐厅验证码', field: 'restCode' },
    { th: '可用月数', field: 'availableMonths' },
    { th: '使用须知', field: 'notice' },
  ]
}
export {
  couponTableOpts,
  businessCouponTableOpts
}
