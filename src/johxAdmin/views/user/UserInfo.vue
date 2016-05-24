<template>
  <div>
    <div class="page-header">
      <h5>用户信息 <jo-loading :loading='$loadingAsyncData'></jo-loading></h5>
    </div>
    <div class="row">
      <div class="col-xs-4">姓名:{{userData.userName}}</div>
      <div class="col-xs-4">类型:{{userData.memberName}}</div>
      <div class="col-xs-4">年龄:{{userData.birthday | toAge}}</div>
      <div class="col-xs-4">性别:{{userData.gender|toSexString}}</div>
      <div class="col-xs-4">会员:{{userData.isVip|toIsvipString}}</div>
      <div class="col-xs-12"><span class="field-name">登录时间:</span>{{userData.loginTime |datetime}}</div>
      <div class="col-xs-12"><span class="field-name">注册时间:</span>{{userData.registerTime |datetime}}</div>
      <div class="col-xs-12">
        <a @click='showUserDetail=true' class="btn btn-info btn-sm">用户更多信息</a>
      </div>
    </div>
    <div class="page-header">
      <h5>订单信息</h5>
    </div>
    <div class="row">
      <jo-panel :title="'订单 '+($index+1)+' '+order.orderNo" v-for="order in userData.orders |orderBy 'orderDate' -1 ">
        <div slot='body'>
          <p><span class="field-name">订单类型:</span>{{order.orderType | toOrderTypeString}}</p>
          <p><span class="field-name">下单时间:</span>{{order.orderDate | datetime}}</p>
          <p><span class="field-name">价格:</span>{{order.orderMoney | currency '¥'}}</p>
          <p><span class="field-name">状态:</span>{{order.orderStatus | toOrderStatusString}}</p>
          <!-- isRest -->
          <div v-if='isRest(order.orderType)'>
            <p>----------------不等位/待排队---------------</p>
            <p><span class="field-name">餐厅:</span>{{order.restName}}</p>
            <p><span class="field-name">预约时间:</span>{{order.eatDate | datetime}}</p>
            <p><span class="field-name">下单人/人数:</span>{{order.bookerName}} {{order.bookerSex | toSexString}}/{{order.personNum}}人 </p>
          </div>
          <div v-else>
            <button @click='toOrder(order.orderId)' class="btn btn-info">详情</button>
          </div>
          <!-- isRest -->
        </div>
      </jo-panel>
    </div>
    <user-detail v-if="showUserDetail" :show.sync='showUserDetail' :user-data='userData'></user-detail>
    <order-detail v-if='showOrderDetail' :show.sync="showOrderDetail" :orderid='selectedOrderId'></order-detail>
  </div>
</template>
<script>
import {
  joInput,
  joPanel,
  joLoading
} from 'jo'
import {
  imService
} from 'api'
import userDetail from './userDetail'
import orderDetail from './orderDetail'
export default {
  components: {
    joInput,
    joPanel,
    joLoading,
    userDetail,
    orderDetail
  },
  data() {
    return {
      showUserDetail: false,
      showOrderDetail: false,
      userData: {},
      selectedOrderId: {}
    }
  },
  methods: {
    showAlert(msg) {
      this.$root.$emit('showAlert', msg)
    },
    toOrder(orderId) {
      this.selectedOrderId = orderId
      this.showOrderDetail = true
    },
    isRest(orderType) {
      // 不等位与待排队判断
      return orderType === '1' || orderType === '2'
    },
  },
  asyncData(resolve, reject) {
    imService.getAccount(this.$route.query.visitorImId)
      .then(userData => resolve({
        userData
      }))
  },
}
</script>
<style scoped>
.field-name {
  display: inline-block;
  width: 90px;
}
</style>
