<template>
  <div>
    <div class="page-header">
      <h4>活动列表 <jo-loading :loading="$loadingAsyncData"></jo-loading><button @click='showAdd=true' class="btn btn-warning btn-sm"><i class="fa fa-plus"></i>新增活动</button><button @click='showOrder=true' class="btn btn-info btn-sm"><i :class="['fa','fa-arrow-up']"></i>前台显示排序</button></h4>
    </div>
    <!-- 排序面板 -->
    <order-panel v-if='showOrder' :show.sync='showOrder' :data='eventList'></order-panel>
    <!-- 添加面板 -->
    <event-panel v-if='showAdd' mode='add' :reload-list.sync='reloadList' :show.sync='showAdd'>
    </event-panel>
    <!-- 编辑面板 -->
    <event-panel v-if='showEdit' mode='edit' :reload-list.sync='reloadList' :show.sync='showEdit' :event-id='selectedEventId'>
    </event-panel>
    <!-- 库存编辑面板 -->
    <stock-panel v-if='showStock' :show.sync='showStock' :event-id='selectedEventId'></stock-panel>
    <!-- 表格组件 -->
    <jo-table :data='eventList' :option='eventTableOpts' @trclick='tableClick'>
    </jo-table>
  </div>
</template>
<script>
import {
  joTable,
  joLoading
} from 'jo'
import {
  v2EventService
} from 'api'
import {
  eventTableOpts
} from './eventOpts'
import eventPanel from './eventPanel'
import stockPanel from './stockPanel'
import orderPanel from './orderPanel'
export default {
  components: {
    joTable,
    joLoading,
    eventPanel,
    stockPanel,
    orderPanel
  },
  data() {
    return {
      eventTableOpts,
      reloadList: 0,
      showAdd: false,
      showEdit: false,
      //库存显示
      showStock: false,
      //排序显示
      showOrder: false,
      selectedEventId: 0,
      eventList: [],
    }
  },
  methods: {
    tableClick(e, row, type) {
      if (type === 'edit') this.handleEdit(row.eventId)
      if (type === 'stockEdit') this.handleStockEdit(row.eventId)
      if (type === 'down') this.handleDown(row.eventId)
    },
    handleEdit(eventId) {
      this.selectedEventId = eventId
      this.showEdit = true
    },
    handleStockEdit(eventId) {
      this.selectedEventId = eventId
      this.showStock = true
    },
    handleDown(eventId) {
      log('下', eventId)
    },
    updateList(msg) {
      this.reloadList += 1
      this.$root.$emit('showAlert', msg)
    }
  },
  watch: {
    'reloadList': 'reloadAsyncData'
  },
  asyncData(resolve, reject) {
    v2EventService.getEvents()
      .then(eventList => resolve({
        eventList
      }))
  }
}
</script>
