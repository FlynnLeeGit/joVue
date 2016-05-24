<template>
  <div>
    <div class="page-header">
      <h4>餐厅列表<jo-loading :loading='$loadingAsyncData'></jo-loading><button @click='showAdd=true' class="btn btn-primary btn-sm"><i class="fa fa-plus"></i>新增餐厅</button><button @click='showOrder=true' class="btn btn-info btn-sm"><i :class="['fa','fa-arrow-up']"></i>前台显示排序</button></h4>
    </div>
    <!-- 表格区域 -->
    <jo-table :data="restList" :option="tableOptions" @trclick='tableClick'>
    </jo-table>
    <!-- 三个面板 -->
    <add-panel v-if='showAdd' :refresh-list.sync='refreshList' :show.sync='showAdd'></add-panel>
    <edit-panel v-if='showEdit' :show.sync='showEdit' :refresh-list.sync='refreshList' :id='selectedRecordId'></edit-panel>
    <coupon-panel v-if='showCoup' :show.sync='showCoup' :data='selectedRecord'></coupon-panel>
    <order-panel v-if='showOrder' :show.sync='showOrder' :data='restList'></order-panel>
  </div>
</template>
<script>
import {
  tableOptions
} from './_restOptions'
import {
  joTable,
  joLoading
} from 'jo'
import {
  v2RestService
} from 'api'
export default {
  components: {
    addPanel: require('./addPanel'),
    editPanel: require('./editPanel'),
    couponPanel: require('./couponPanel'),
    orderPanel: require('./orderPanel'),
    joTable,
    joLoading
  },
  data() {
    return {
      showAdd: false,
      showEdit: false,
      showCoup: false,
      showOrder: false,
      refreshList: 0,
      restList: [],
      selectedRecordId: 0,
      selectedRecord: null,
      tableOptions
    }
  },
  methods: {
    tableClick(e, row, type) {
      if (type === 'edit') this.handleEdit(row.restId)
      if (type === 'coupon') this.handleCoupon(row)
    },
    handleEdit(restId) {
      this.selectedRecordId = restId
      this.showEdit = true
    },
    handleCoupon(row) {
      this.selectedRecord = row
      this.showCoup = true
    }
  },
  watch: {
    'refreshList': 'reloadAsyncData'
  },
  asyncData(resolve, reject) {
    v2RestService.getRests()
      .then(restList => resolve({
        restList
      }))
  }
}
</script>
<style>
</style>
