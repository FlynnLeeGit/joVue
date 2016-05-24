export default {
  '/BusinessCouponList': {
    name: 'BusinessCouponList',
    component: resolve => {
      require(['../views/coupon/BusinessCouponList'], resolve)
    }
  },
  '/ServiceCouponList': {
    name: 'ServiceCouponList',
    component: resolve => {
      require(['../views/coupon/ServiceCouponList'], resolve)
    }
  },
  '/MemberCouponList': {
    name: 'MemberCouponList',
    component: resolve => {
      require(['../views/coupon/MemberCouponList'], resolve)
    }
  },
}
