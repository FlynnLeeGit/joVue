<template>
  <div>
    <div class="page-header">
      <h4>会员订单列表 <jo-loading :loading="$loadingAsyncData"></jo-loading></h4>
    </div>
    {{searchData|json}}
    <div class="row">
      <jo-input label="购买类型" sm="6">
        <select v-model='searchData.vipWay' class="form-control">
          <option v-for='o in buyTypeOpts' :value="o.value" :selected='$index===0'>{{o.text}}</option>
        </select>
      </jo-input>
      <jo-input label="会员等级类型" sm='6'>
        <select v-model='searchData.memberId' class="form-control">
          <option value='' selected>全部</option>
          <option v-for='o in memberLevelOpts' :value="o.memberId">{{o.memberLevel}} {{o.memberMoney + '元'}}</option>
        </select>
      </jo-input>
    </div>
    <p class="text-center">
      <button @click='reloadListCount++' class="btn btn-info search-btn">查询</button>
    </p>
    </form>
    <jo-table :data="memberList" :option="tableMemberOpts"></jo-table>
  </div>
</template>
<script>
import {
  joInput,
  joTable,
  joLoading,
  joFetch
} from 'jo'

import {
  tableMemberOpts,
  buyTypeOpts,
} from './orderOptions'

import {
  vipService,
  orderService
} from 'api'
export default {
  components: {
    joInput,
    joTable,
    joLoading
  },
  data() {
    return {
      buyTypeOpts,
      memberLevelOpts: [],
      tableMemberOpts,
      reloadListCount: 0,
      memberList: [],
      searchData: {}
    }
  },
  asyncData(resolve, reject) {
    Promise.all([vipService.getVips(), orderService.getVipOrders(this.searchData)])
      .then(resArr => {
        resolve({
          memberLevelOpts: resArr[0],
          memberList: resArr[1]
        })
      })
  },
  watch: {
    'reloadListCount': 'reloadAsyncData',
  },

}
</script>
