<template>
  <modal :callback='confirm' :large='true' :show.sync='show'>
    <div class="modal-header" slot='modal-header'>
      <h4>长时间活动库存编辑
      	<jo-loading :loading='$loadingAsyncData'></jo-loading>
      </h4>
    </div>
    <div class="modal-body row" slot='modal-body'>
      <stock-panel-calendar :data='stockData' :update-array='updateArray'></stock-panel-calendar>
      {{updateArray|json}}
    </div>
  </modal>
</template>
<script>
import {
  modal,
  joLoading,
} from 'jo'
import {
  v2EventService
} from 'api'
import stockPanelCalendar from './stockPanel_calendar'
export default {
  props: {
    show: Boolean,
    eventId: String
  },
  components: {
    modal,
    joLoading,
    stockPanelCalendar
  },
  data() {
    return {
      stockData: {},
      updateArray: []
    }
  },
  methods: {
    confirm() {
      log(sf(this.updateArray))
      this.updateList('库存编辑成功!')
    },
    updateList(msg) {
      this.show = false
      this.$root.$emit('showAlert', msg)
    }
  },
  asyncData(resolve, reject) {
    v2EventService.getLongTimeStock(this.eventId)
      .then(stockData => resolve({
        stockData
      }))
  }
}
</script>
