<template>
  <div>
    <!-- {{datalist|json}} -->
    <div class="page-header">
      <h4>会员优惠券 <button @click='showAdd=true' class="btn btn-warning">添加会员券</button><jo-loading :loading="$loadingAsyncData"></jo-loading></h4>
    </div>
    <member-coupon-panel v-if='showAdd' :show.sync='showAdd' :reload-list.sync='reloadList'></member-coupon-panel>
    <jo-table :data="datalist" :option='memberCouponTableOpts' @trclick='tableClick'></jo-table>
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

    }
  },
  methods: {
    tableClick(e, row, type) {

    }
  },
  asyncData(resolve, reject) {
    resolve()
  },
  watch: {
    'reloadList': 'reloadAsyncData'
  }

}
</script>
<style>
</style>
