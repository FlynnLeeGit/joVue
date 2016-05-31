<template>
  <div>
    <div class="page-header">
      <h4>不等位/待排队 <jo-loading :loading="$loadingAsyncData"></jo-loading></h4> {{searchData|json}}
    </div>
    <!-- 统计 -->
    <div class="alert alert-info">订单数量 {{datalist.length}}个 订单金额 {{chartObj.orderMoney | currency '¥'}} 支付金额 {{chartObj.paidMoney|currency '¥'}} 下单人数 {{orderPersonCount}}人</div>
    <!-- 筛选区 -->
    <jo-input sm='4' label="下单起始时间">
      <jo-datetime :value.sync='searchData.startTime'></jo-datetime>
    </jo-input>
    <jo-input sm='4 ' label="下单结束时间">
      <jo-datetime :value.sync='searchData.endTime'></jo-datetime>
    </jo-input>
    <jo-input sm='4' label="注册手机号">
      <input v-model='searchData.orderPhone' class="form-control" type="number">
    </jo-input>
    <jo-input sm='4' label="订单类型">
      <select class="form-control" v-model='searchData.orderType'>
        <option value="" selected>全部</option>
        <option v-for='o in orderTypeOptions' :value='o.serName | orderTypeToString'>{{o.serName }}</option>
      </select>
    </jo-input>
    <jo-input sm='4' label="订单状态">
      <select class="form-control" v-model='searchData.orderStatus'>
        <option v-for='o in orderStatusOptions' :value='o.value'>{{o.text}}</option>
      </select>
    </jo-input>
    <jo-input sm='4' label="用户类型">
      <select class="form-control" v-model='searchData.isVip'>
        <option value="" selected>全部</option>
        <option v-for='o in orderVipOptions' :value='o.memberId'>{{o.memberLevel}}</option>
      </select>
    </jo-input>
    <div class="row text-center">
      <button @click='refreshList++' type='submit' class="btn btn-info search-btn">查询 与 刷新</button>
    </div>
    <!-- 表格区域开始 -->
    <jo-table :data='datalist' :option.sync='tableOptions'>
    </jo-table>
  </div>
</template>
<script>
import {
  joTable,
  joInput,
  joDatetime,
  joLoading
} from 'jo'
import {
  orderStatusOptions,
  tableOptions
} from './orderOptions'
import {
  orderService,
  vipService,
  cardService
} from 'api'
export default {
  components: {
    joTable,
    joInput,
    joDatetime,
    joLoading,
  },
  data() {
    return {
      orderStatusOptions,
      tableOptions,
      refreshList: 0,
      searchData: {},
      datalist: [],
      orderTypeOptions: [],
      orderVipOptions: [],
    }
  },
  computed: {
    /** [chartObj 下单金额与已付金额统计] */
    chartObj() {
      let intialVal = {
        orderMoney: 0,
        paidMoney: 0,
      }
      return this.datalist.reduce((prevVal, now) => ({
        orderMoney: prevVal.orderMoney + now.orderMoney,
        paidMoney: prevVal.paidMoney + now.paidMoney,
      }), intialVal)
    },
    /** [orderPersonCount 计算数组中orderPhone去重的数量] */
    orderPersonCount() {
      let tmpObj = {}
      this.datalist.forEach(val => {
        tmpObj[val.orderPhone] = ''
      })
      return Object.keys(tmpObj).length
    }
  },
  asyncData(resolve, reject) {
    Promise.all([orderService.getOrders(this.searchData), vipService.getVips(), cardService.getSerInfos()])
      .then(resArr => resolve({
        datalist: resArr[0] || [],
        orderVipOptions: resArr[1] || [],
        orderTypeOptions: resArr[2].map(ser => ({
          serName: ser.serName
        })) || [],
      }))
  },
  watch: {
    refreshList: 'reloadAsyncData'
  }
}
</script>
