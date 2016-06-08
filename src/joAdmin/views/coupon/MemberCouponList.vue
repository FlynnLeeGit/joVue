<template>
  <div>
    <!-- {{couponList|json}} -->
    <div class="page-header">
      <h4>会员优惠券 <button @click='showAdd=true' class="btn btn-warning">添加会员券</button><jo-loading :loading="$loadingAsyncData"></jo-loading></h4>
    </div>
    <member-coupon-panel v-if='showAdd' :show.sync='showAdd' :reload-list.sync='reloadList'></member-coupon-panel>
    <jo-table :data="couponList" :option='memberCouponTableOpts'></jo-table>
  </div>
</template>
<script>
import {
  joLoading,
  joTable,
} from 'jo'
import memberCouponPanel from './memberCouponPanel'
import {
  memberCouponTableOpts
} from './couponOpts'
import {
  v2CouponService
} from 'api'
export default {
  components: {
    joLoading,
    joTable,
    memberCouponPanel
  },
  data() {
    return {
      memberCouponTableOpts,
      showAdd: false,
      reloadList: 0,
      couponList: []

    }
  },
  asyncData(resolve, reject) {
    v2CouponService.getVipCoupons()
      .then(couponList => resolve({
        couponList
      }))
  },
  watch: {
    'reloadList': 'reloadAsyncData'
  }

}
</script>
<style>
</style>
