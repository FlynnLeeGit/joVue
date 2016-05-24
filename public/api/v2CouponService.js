import { joFetch } from 'jo'
const couponServer = `${window.server}/v2/coupon`
const v2CouponService = {
  // 获得所有商家优惠券
  getAllCoupons() {
    return joFetch.post(`${couponServer}/select`)
      .then(res => res.list)
  },
  // 生成生活优惠券
  insertLifeCoupon(coupJson, couponNum) {
    return joFetch.post(`${couponServer}/insert/life`, { lifeCoupon: JSON.stringify(coupJson), couponNum })
  },
  // 生成餐厅优惠券
  insertRestCoupon(coupJson, couponNum) {
    return joFetch.post(`${couponServer}/insert/rest`, { restCoupon: JSON.stringify(coupJson), couponNum })
  },
}
export default v2CouponService
