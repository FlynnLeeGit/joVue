<template>
  <div>
    <div v-if='showSession'>
      <h3 class="text-center text-info">当前为{{isShort?'场次活动':'长期活动(只能有一种场次)'}}</h3>
      <div class="row" v-for='session in sessionData'>
        <!-- 短场次活动 -->
        <div class="col-xs-12">
          <p class="text-center">
            <button @click='delSession($index)' class="btn btn-danger btn-lg">删除场次{{$index+1}}</button>
          </p>
          <!-- 时间 场馆 地址 -->
          <jo-input label='时间标签' sm='6'>
            <input v-model='session.eventDatetime' type="text" class="form-control" placeholder="第二段文字时间">
          </jo-input>
          <jo-input label='场馆' sm='6'>
            <input v-model='session.eventVenue' type="text" class="form-control">
          </jo-input>
          <jo-input label='地址' sm='12'>
            <input v-model='session.eventAddress' type="text" class="form-control">
          </jo-input>
          <!-- 场次标签 只有短场次才有-->
          <div v-if='isShort'>
            <jo-input label='场次标签1' sm='6'>
              <input v-model='session.firstLabelContent' type="text" class="form-control">
            </jo-input>
            <jo-input label='场次标签2' sm='6'>
              <input v-model='session.secondLabelContent' type="text" class="form-control">
            </jo-input>
          </div>
          <!-- 开始时间 结束时间 只有长时间活动才有-->
          <div v-if='isLong'>
            <jo-input label='开始日期' sm='6'>
              <jo-datetime :no-time='true' :value.sync='session.eventStartDate'></jo-datetime>
            </jo-input>
            <jo-input label='结束日期' sm='6'>
              <jo-datetime :no-time='true' :value.sync='session.eventEndDate'></jo-datetime>
            </jo-input>
          </div>
          <!-- 票务类型库存组件 -->
          <event-session-stock :type-data='session.eventTypeLabel' :session-index='$index'></event-session-stock>
        </div>
      </div>
      <p class="text-center">
        <button @click='addSession' class="btn btn-lg  btn-success"><i class="fa fa-plus"></i> 添加场次</button>
      </p>
    </div>
    <div v-else>
      <h1 class="text-danger">您还未选择场次类型 请到活动基本信息页填写</h1>
    </div>
  </div>
</template>
<script>
import {
  joInput,
  joDatetime
} from 'jo'
import {
  vipService
} from 'api'
import eventSessionStock from './_eventSessionStock.vue'
export default {
  props: {
    sessionData: {
      type: Array,
      required: true
    },
    type: null
  },
  components: {
    joInput,
    joDatetime,
    eventSessionStock
  },
  data() {
    return {
      eventPriceList: []
    }
  },
  methods: {
    addSession() {
      if (this.isShort || (this.isLong && this.sessionData.length < 1)) {
        this.sessionData.push({
          eventTypeLabel: []
        })
      }
    },
    delSession($index) {
      this.sessionData.splice($index, 1)
    }
  },
  computed: {
    isLong() {
      return this.type === '1'
    },
    isShort() {
      return this.type === '0'
    },
    showSession() {
      return this.type === '0' || this.type === '1'
    }
  },
  // 异步获取会员类型
  asyncData(resolve, reject) {
    vipService.getVips()
      .then(list => {
        resolve({
          eventPriceList: list.map(m => ({
            memberId: m.memberId,
            _memberLevel: m.memberLevel,
            _memberMoney: m.memberMoney
          }))
        })
      })
  },

}
</script>
