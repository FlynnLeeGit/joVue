<template>
  <div>
    <div class="page-header">
      <h4>生活服务订单 <jo-loading :loading="$loadingAsyncData"></jo-loading></h4>
    </div>
    <div class="row">
      <jo-input sm="4" label="下单开始时间">
        <jo-datetime :value.sync="searchData.startTime"></jo-datetime>
      </jo-input>
      <jo-input sm="4" label="下单结束时间">
        <jo-datetime :value.sync="searchData.endTime"></jo-datetime>
      </jo-input>
      <jo-input sm="4" label="注册手机号">
        <input v-model='searchData.orderPhone' type="number" class="form-control" placeholder="请填写数字">
      </jo-input>
      <jo-input sm="4" label="订单状态">
        <select v-model='searchData.orderStatus' class="form-control">
          <option v-for='status in orderStatusOptions' :value="status.value">{{status.text}}</option>
        </select>
      </jo-input>
      <jo-input sm="4" label="用户类型">
        <select v-model='searchData.isVip' class="form-control">
          <option v-for='p in orderVipOptions' :value="p.value">{{p.text}}</option>
        </select>
      </jo-input>
    </div>
    <p class="text-center">
      <button @click='refreshList++' class="btn btn-info">查询</button>
    </p>
    <!-- table -->
    <jo-table :data="datalist" @trclick='tableClick' :option="tableLifeOptions">
    </jo-table>
    <life-order-detail v-if='showDetail' :show.sync='showDetail' :data='selectedRecord'></life-order-detail>
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
  tableLifeOptions,
  orderStatusOptions,
  orderTypeOptions,
  orderVipOptions
} from './orderOptions'
import lifeOrderDetail from './lifeOrderDetail'
import {
  orderService
} from 'api'
export default {
  components: {
    joInput,
    joTable,
    joDatetime,
    lifeOrderDetail,
    joLoading
  },
  data() {
    return {
      orderStatusOptions,
      orderVipOptions,
      tableLifeOptions,
      orderTypeOptions,
      showDetail: false,
      datalist: [],
      selectedRecord: {},
      refreshList: 0,
      searchData: {
        orderType: 'other'
      }
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
  },
  methods: {
    updateList() {
      /** 成功后重新载入列表数据 */
      this.refreshList++
    },
    tableClick(e, row, type) {
      if (type === 'deal') this.handleDeal(row.orderId)
      if (type === 'payback') this.handleChangeStatus(row.orderId, 100006, '是否确认退款?')
      if (type === 'cancel') this.handleChangeStatus(row.orderId, 100004, '是否确认取消?')
      if (type === 'detail') this.handleShowDetail(row)
    },
    handleDeal(orderId) {
      orderService.updateDeal(orderId).then(res => this.updateList())
    },
    handleChangeStatus(orderId, orderStatus, confirmMsg) {
      if (window.confirm(confirmMsg)) orderService.updateStatus(orderId, orderStatus)
        .then(res => this.updateList())
    },
    handleShowDetail(row) {
      this.selectedRecord = row
      this.showDetail = true
    }
  }
}
</script>
