import { joFetch } from 'jo'

const couponServer = `${window.config.server}/v2/coupon`

export default {
  // 商家优惠券板块 下 获得所有商家优惠券
  getAllCoupons() {
      return joFetch.post(`${couponServer}/select`)
        .then(res => res.list)
    },
    // 生活服务列表下 生成生活优惠券
    insertLifeCoupon(couponJson, couponNum) {
      return joFetch.post(`${couponServer}/insert/life`, { lifeCoupon: JSON.stringify(couponJson), couponNum })
    },
    // 餐厅列表下 生成餐厅优惠券
    insertRestCoupon(couponJson, couponNum) {
      return joFetch.post(`${couponServer}/insert/rest`, { restCoupon: JSON.stringify(couponJson), couponNum })
    },

    /** [会员优惠券板块] */
    // 获得会员优惠券
    getVipCoupons() {
      return joFetch.post(`${couponServer}/vip`)
        .then(res => res.list)
    },
    // 添加会员优惠券
    insertVipCoupon(couponJson, couponNum) {
      return joFetch.post(`${couponServer}/vip/insert`, { vipCoupon: JSON.stringify(couponJson) }, couponNum)
    },
}
