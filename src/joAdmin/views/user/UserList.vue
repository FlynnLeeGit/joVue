<template>
  <div>
    <div class="page-header">
      <h4>用户列表 <jo-loading :loading="$loadingAsyncData"></jo-loading></h4>
    </div>
    <div class="row">
      <jo-input sm="3" label="注册时间">
        <jo-datetime ph="注册起始时间" :value.sync='searchData.registStartTime'></jo-datetime>
      </jo-input>
      <jo-input sm="3" label="至">
        <jo-datetime ph="注册结束时间" :value.sync='searchData.registEndTime'></jo-datetime>
      </jo-input>
      <jo-input sm="3" label="登录时间">
        <jo-datetime ph="登录开始时间" :value.sync='searchData.startTime'></jo-datetime>
      </jo-input>
      <jo-input sm="3" label="至">
        <jo-datetime ph="登录结束时间" :value.sync='searchData.endTime'></jo-datetime>
      </jo-input>
      <jo-input sm="3" label="会员时间">
        <jo-datetime ph="会员开始时间" :value.sync='searchData.vipStartTime'></jo-datetime>
      </jo-input>
      <jo-input sm="3" label="至">
        <jo-datetime ph="会员结束时间" :value.sync='searchData.vipEndTime'></jo-datetime>
      </jo-input>
    </div>
    <div class="row">
      <jo-input sm="4" label="手机号">
        <input class="form-control" type="number" v-model='searchData.mobile'>
      </jo-input>
      <jo-input sm="4" label="是否会员">
        <select class="form-control" v-model='searchData.isVip'>
          <option v-for='o in isVipOpts' :value='o.value'>{{o.text}}</option>
        </select>
      </jo-input>
      <jo-input sm="4" label="购买方式">
        <select class="form-control" v-model='searchData.vipWay'>
          <option v-for='o in vipWayOpts' :value='o.value'>{{o.text}}</option>
        </select>
      </jo-input>
    </div>
    <p class="text-center">
      <button @click='refreshList++' class="btn btn-info search-btn">查询</button>
    </p>
    </form>
    <jo-table :data="userList" :option="tableOpts" search-field='mobile' @trclick='tableClick' :search-value='searchData.mobile'></jo-table>
  </div>
</template>
<script>
import {
  joInput,
  joTable,
  joDatetime,
  joLoading,
} from 'jo'
import {
  isVipOpts,
  vipWayOpts,
  tableOpts
} from './userOpts'
import {
  accountService
} from 'api'
export default {
  components: {
    joInput,
    joTable,
    joDatetime,
    joLoading
  },
  data() {
    return {
      isVipOpts,
      vipWayOpts,
      tableOpts,
      refreshList: 0,
      userList: [],
      searchData: {}
    }
  },
  asyncData(resolve, reject) {
    accountService.getAccounts(this.searchData)
      .then(userList => resolve({
        userList
      }))
  },
  watch: {
    'refreshList': 'reloadAsyncData',
  },
  methods: {
    tableClick(e, row, type) {
      if (type === 'card') this.handleCard(row)
    },
    /** [handleCard 跳转到支付卡片页面] */
    handleCard(row) {
      this.$router.go({
        name: 'PayCard',
        query: {
          mobile: row.mobile,
          accountId: row.accountId,
          isVip: row.isVip
        }
      })
    }
  }
}
</script>
