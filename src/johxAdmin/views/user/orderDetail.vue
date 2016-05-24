<template>
  <modal :show.sync='show'>
    <div class="modal-header" slot='modal-header'>
      <h4>订单 详情  <jo-loading :loading='$loadingAsyncData'></jo-loading></h4>
    </div>
    <div class="modal-body row" slot='modal-body'>
      <div v-if='cardDetail'>
        <p>显示信息</p>
        <jo-input xs="12" v-for='info in cardDetail.cardInfo' :label="info.key">
          <input type="text" class="form-control" :value='info.value' readonly>
        </jo-input>
        <p>非显示信息</p>
        <jo-input xs="12" v-for='info in cardDetail.otherInfo' :label="info.key">
          <input type="text" class="form-control" :value='info.value' readonly>
        </jo-input>
      </div>
      <p v-else>无此卡片详细信息</p>
    </div>
  </modal>
</template>
<script>
import {
  modal,
  joInput,
  joLoading
} from 'jo'
import {
  orderService
} from 'api'
export default {
  props: {
    show: {
      twoWay: true,
      type: Boolean
    },
    orderid: {
      type: String
    }
  },
  components: {
    modal,
    joInput,
    joLoading
  },
  data() {
    return {
      cardDetail: null
    }
  },
  asyncData(resolve, reject) {
    orderService.getOrderDetail(this.orderid)
      .then(cardDetail => resolve({
        cardDetail
      }))
  }
}
</script>
