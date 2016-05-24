<template>
  <div>
    <div class="page-header">
      <h4>不等位/待排队 <jo-loading :loading="$loadingAsyncData"></jo-loading></h4>
    </div>
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
        <option v-for='o in orderTypeOptions' :value='o.value'>{{o.text}}</option>
      </select>
    </jo-input>
    <jo-input sm='4' label="订单状态">
      <select class="form-control" v-model='searchData.orderStatus'>
        <option v-for='o in orderStatusOptions' :value='o.value'>{{o.text}}</option>
      </select>
    </jo-input>
    <jo-input sm='4' label="用户类型">
      <select class="form-control" v-model='searchData.isVip'>
        <option v-for='p in orderVipOptions' :value='p.value'>{{p.text}}</option>
      </select>
    </jo-input>
    <div class="row text-center">
      <button @click='refreshList++' type='submit' class="btn btn-info search-btn">查询</button>
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
  orderTypeOptions,
  orderVipOptions,
  tableOptions
} from './orderOptions'
import {
  orderService
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
      orderTypeOptions,
      orderVipOptions,
      tableOptions,
      refreshList: 0,
      searchData: {},
      datalist: []
    }
  },
  asyncData(resolve, reject) {
    orderService.getOrders(this.searchData)
      .then(datalist => resolve({
        datalist
      }))
  },
  watch: {
    refreshList: 'reloadAsyncData'
  }
}
</script>
