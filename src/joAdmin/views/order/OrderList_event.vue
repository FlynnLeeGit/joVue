<template>
  <div>
    {{selectedOrderId}}
    <div class="page-header">
      <h4>活动订单 <jo-loading :loading="$loadingAsyncData"></jo-loading></h4> {{searchData|json}}
    </div>
    <jo-input sm='4' label="注册手机号">
      <input v-model='searchData.orderPhone' class="form-control" type="number">
    </jo-input>
    <jo-input sm='4' label="活动类型">
      <select class="form-control" v-model='searchData.orderType'>
        <option value="" selected>全部</option>
      </select>
    </jo-input>
    <jo-input sm='4' label="订单状态">
      <select class="form-control" v-model='searchData.orderStatus'>
        <option v-for='o in orderStatusOptions' :value='o.value'>{{o.text}}</option>
      </select>
    </jo-input>
    <jo-input sm='4' label="会员类型">
      <select class="form-control" v-model='searchData.memberId'>
        <option value="" selected>全部</option>
        <option v-for='o in orderVipOptions' :value='o.memberId'>{{o.memberLevel}}</option>
      </select>
    </jo-input>
    <p class="text-center">
      <button @click='refreshList++' type='submit' class="btn btn-info search-btn">查询 与 刷新</button>
    </p>
    <!-- 详情面板 -->
    <event-detail :show.sync='showDetail' v-if='showDetail' :id='selectedOrderId'></event-detail>
    <!-- 表格区域开始 -->
    <jo-table :data='datalist' :option.sync='tableEventOpts' @trclick='tableClick'>
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
  tableEventOpts,
} from './orderOptions'

import {
  orderService,
  vipService,
  cardService
} from 'api'

import eventDetail from './eventDetail'

export default {
  components: {
    joTable,
    joInput,
    joDatetime,
    joLoading,
    eventDetail
  },
  data() {
    return {
      orderStatusOptions,
      tableEventOpts,
      showDetail: false,
      refreshList: 0,
      searchData: {},
      datalist: [],
      orderVipOptions: [],
      selectedOrderId: '',
    }
  },
  methods: {
    tableClick(e, row, type) {
      if (type === 'detail') this.handleDetail(row.orderId)
    },
    handleDetail(orderId) {
      this.selectedOrderId = orderId
      this.showDetail = true
    }
  },
  asyncData(resolve, reject) {
    Promise.all([orderService.getOrders(this.searchData), vipService.getVips()])
      .then(resArr => resolve({
        datalist: resArr[0] || [],
        orderVipOptions: resArr[1] || [],
      }))
  },
  watch: {
    refreshList: 'reloadAsyncData'
  }
}
</script>
