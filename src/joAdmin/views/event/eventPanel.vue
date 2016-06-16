<template>
  <modal effect='fade' :large='true' :show.sync='show' :title="isAdd?'添加面板':'编辑面板'" :callback='confirm'>
    <div class="modal-body row" slot='modal-body'>
      <jo-tabs>
        {{eventId}}
        <jo-tab header='活动基本信息'>
          <event-info :data='editData' :mode='mode'></event-info>
        </jo-tab>
        <jo-tab header='活动场次'>
          <event-session :session-data='editData.eventSessionLabel' :type='editData.type'></event-session>
        </jo-tab>
        <jo-tab header='价格矩阵'>
          <event-price :price-data='editData.eventPriceList'></event-price>
        </jo-tab>
      </jo-tabs>
    </div>
  </modal>
</template>
<script>
import {
  modal,
  joTabs,
  joTab
} from 'jo'
import {
  v2EventService
} from 'api'

import eventInfo from './_eventInfo'
import eventSession from './_eventSession'
import eventPrice from './_eventPrice'

export default {
  components: {
    modal,
    joTabs,
    joTab,
    eventInfo,
    eventSession,
    eventPrice
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    reloadList: {
      type: Number,
      twoWay: true
    },
    mode: {
      type: String,
      required: true
    },
    eventId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editData: {
        eventPriceList: [
          ['']
        ],
        eventSessionLabel: []
      }
    }
  },
  computed: {
    isAdd() {
      return this.mode === 'add'
    },
    isEdit() {
      return this.mode === 'edit'
    },
  },
  methods: {
    confirm() {
      if (this.isAdd) {
        log('tianjia')
        v2EventService.insertEvent(this.editData)
          .then(res => this.updateList('插入活动成功!'))
      }
      if (this.isEdit) {
        log('edit')
      }
    },
    updateList(msg) {
      this.show = false
      this.reloadList += 1
      this.$root.$emit('showAlert', msg)
    }
  },
  asyncData(resolve, reject) {
    if (this.isAdd) resolve()
    if (this.isEdit) log('编辑下', this.eventId)
  }
}
</script>
