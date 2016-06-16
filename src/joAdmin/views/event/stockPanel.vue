<template>
  <modal :callback='confirm' :large='true' title='长时间活动库存编辑' :show.sync='show'>
    <div class="modal-body row" slot='modal-body'>
      {{eventId}} {{updateArray|json}}
      <stock-panel-calendar :data='stockData' :update-array='updateArray'></stock-panel-calendar>
    </div>
  </modal>
</template>
<script>
import {
  modal,
} from 'jo'
import stockPanelCalendar from './stockPanel_calendar'
export default {
  props: {
    show: Boolean,
    eventId: String
  },
  components: {
    modal,
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
    let tmp = {}
    for (let i = 5; i < 28; i++) {
      tmp[`2016-06-${i<10?'0'+i:i}`] = {
        stockList: [{
          labelContent: '标签1',
          stockNum: 30,
          stockId: i + '',
          stockStatus: '1',
        }, {
          labelContent: '标签2',
          stockNum: 20,
          stockId: i + '',
          stockStatus: '1',
        }, {
          labelContent: '标签3',
          stockNum: 20,
          stockId: i + '',
          stockStatus: '1',
        }]
      }
    }

    resolve({
      stockData: tmp
    })
  }
}
</script>
