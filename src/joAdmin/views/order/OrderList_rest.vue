<template>
  <div>
    <div class="page-header">
      <h4>不等位/待排队订单 <jo-loading :loading="$loadingAsyncData"></jo-loading></h4>
    </div>
    <jo-input sm="4" label="下单开始时间">
      <jo-datetime :value.sync="searchData.startTime"></jo-datetime>
    </jo-input>
    <jo-input sm="4" label="下单结束时间">
      <jo-datetime :value.sync="searchData.endTime"></jo-datetime>
    </jo-input>
    <jo-input sm="4" label="注册手机号">
      <input v-model='searchData.orderPhone' type="number" class="form-control" placeholder="请填写数字">
    </jo-input>
    <jo-input sm="4" label="餐厅">
      <input v-model='searchData.restName' type="text" class="form-control">
    </jo-input>
    <jo-input sm="4" label="订单状态">
      <select v-model='searchData.orderStatus' class="form-control">
        <option v-for='status in orderStatusOptions' :value="status.value">{{status.text}}</option>
      </select>
    </jo-input>
    <jo-input sm="4" label="会员类型">
      <select v-model='searchData.isVip' class="form-control">
        <option v-for='p in orderVipOptions' :value="p.value">{{p.text}}</option>
      </select>
    </jo-input>
    <p class="text-center">
      <button @click='refreshList++' type="submit" class="btn btn-info">查询 (可按回车查询)</button>
    </p>
    <!-- table -->
    <jo-table :data="datalist" @trclick='tableClick' :option="tableRestOptions">
    </jo-table>
  </div>
</template>
<script>
import {
  joInput,
  joTable,
  joDatetime,
  joLoading
} from 'jo'
import {
  tableRestOptions,
  orderStatusOptions,
  orderTypeOptions,
  orderVipOptions
} from './orderOptions'

import {
  orderService
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
      orderStatusOptions,
      orderTypeOptions,
      orderVipOptions,
      tableRestOptions,
      datalist: [],
      refreshList: 0,
      searchData: {
        orderType: 'rest'
      }
    }
  },
  asyncData(resolve, reject) {
    orderService.getOrders(this.searchData)
      .then(datalist => resolve({
        datalist
      }))
  },
  methods: {
    tableClick(e, row, type) {
      if (type == 'deal') this.handleDeal(row.orderId)
      if (type === 'payback') this.handleChangeStatus(row.orderId, 100006, '是否确认退款?')
      if (type === 'cancel') this.handleChangeStatus(row.orderId, 100004, '是否确认取消?')
    },
    handleDeal(orderId) {
      orderService.updateDeal(orderId).then(res => this.updateList('已处理!'))
    },
    handleChangeStatus(orderId, orderStatus, confirmMsg) {
      if (window.confirm(confirmMsg)) orderService.updateStatus(orderId, orderStatus)
        .then(res => this.updateList('已更新!'))
    },
    updateList(msg) {
      this.refreshList += 1
      this.$root.$emit('showAlert', msg)
    }
  },
  watch: {
    refreshList: 'reloadAsyncData'
  }
}
</script>
