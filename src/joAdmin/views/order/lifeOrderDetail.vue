<template>
  <modal :small="true" :show.sync='show'>
    <!-- header -->
    <div class="modal-header" slot='modal-header'>
      <h4>订单详情 <jo-loading :loading="$loadingAsyncData"></jo-loading></h4>
    </div>
    <!-- body -->
    <div class="modal-body" slot='modal-body'>
      <form v-if='cardDetail' class="form-horizontal">
        <p>显示信息</p>
        <div class="form-group" v-for='info in cardDetail.cardInfo'>
          <label class="col-xs-3 control-label">{{info.key}}</label>
          <div class="col-xs-9">
            <input type="text" class="form-control" readonly :value='info.value' />
          </div>
        </div>
        <p>非显示信息</p>
        <div class="form-group" v-for='info in cardDetail.otherInfo'>
          <label class="col-xs-3 control-label">{{info.key}}</label>
          <div class="col-xs-9">
            <input type="text" class="form-control" readonly :value='info.value' />
          </div>
        </div>
        <p class="text-right">订单金额 {{cardDetail.orderMoney}} 元</p>
      </form>
      <p v-else>无此订单详情</p>
    </div>
    <!-- footer -->
    <div class="modal-footer" slot='modal-footer'>
      <button @click='close' class="btn btn-default">关闭</button>
    </div>
  </modal>
</template>
<script>
import {
  joLoading,
  modal
} from 'jo'
import {
  orderService
} from 'api'
export default {
  props: ['show', 'data'],
  components: {
    modal,
    joLoading
  },
  data() {
    return {
      cardDetail: null
    }
  },
  methods: {
    close() {
      this.show = false
      document.body.classList.remove('modal-open')
    }
  },
  asyncData(resolve, reject) {
    orderService.getOrderDetail(this.data.orderId)
      .then(cardDetail => resolve({
        cardDetail
      }))
  }
}
</script>
