<template>
  <modal effect='fade' :large='true' :show.sync='show' :callback='confirm'>
    <div class="modal-header" slot='modal-header'>
      <h4>{{isAdd?'添加面板':'编辑面板'}}
        <jo-loading :loading='isAdd?confirmLoading:$loadingAsyncData'></jo-loading>
      </h4>
    </div>
    <div class="modal-body row" slot='modal-body'>
      <jo-tabs>
        <!-- {{editData|json}} -->
        <jo-tab header='活动基本信息'>
          <event-info :data='editData' :mode='mode'></event-info>
        </jo-tab>
        <jo-tab header='活动场次'>
          <event-session :session-data='editData.eventSessionLabel' :delete-session='editData.deleteSessionId' :delete-type='editData.deleteTypeId' :type='editData.type'></event-session>
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
  joTab,
  joLoading
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
    joLoading,

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
      confirmLoading: false,
      editData: {
        eventPriceList: [
          ['']
        ],
        eventSessionLabel: [],
        // 需要删除的场次id和票型id 数组
        deleteSessionId: [],
        deleteTypeId: []
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
        this.confirmLoading = true
        v2EventService.insertEvent(this.editData)
          .then(res => this.updateList('插入活动成功!'))
      }
      if (this.isEdit) {
        this.confirmLoading = true
        v2EventService.updateEvent(this.editData)
          .then(res => this.updateList('更新数据成功!'))
      }
    },
    updateList(msg) {
      this.show = false
      this.confirmLoading = false
      this.reloadList += 1
      this.$root.$emit('showAlert', msg)
    }
  },
  asyncData(resolve, reject) {
    if (this.isAdd) resolve()
    if (this.isEdit) v2EventService.getOneEvent(this.eventId)
      .then(editData => resolve({
        editData
      }))
  }
}
</script>
