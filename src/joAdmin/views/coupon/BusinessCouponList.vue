<template>
  <div>
    <!-- {{datalist|json}} -->
    <div class="page-header">
      <h4>商家优惠券 <jo-loading :loading="$loadingAsyncData"></jo-loading></h4>
    </div>
    <jo-table :data="datalist" :option='businessCouponTableOpts' @trclick='tableClick'></jo-table>
  </div>
</template>
<script>
import {
  joTable,
  joLoading
} from 'jo'
import {
  businessCouponTableOpts
} from './couponOpts'
import {
  v2CouponService,
  vipService
} from 'api'


export default {
  components: {
    joTable,
    joLoading
  },
  data() {
    return {
      businessCouponTableOpts,
      datalist: [],
      showAlert: false,
      refreshList: 0
    }
  },
  asyncData(resolve, reject) {
    v2CouponService.getAllCoupons()
      .then(datalist => resolve({
        datalist
      }))
  },
  watch: {
    refreshList: 'reloadAsyncData'
  },
  methods: {
    tableClick(e, row, type) {
      if (type === 'bind') this.handleBind(row)
    },
    handleBind(coupJson) {
      vipService.couponBind(coupJson)
        .then(res => this.updateList())
    },
    updateList() {
      this.refreshList++
    }
  },

}
</script>
