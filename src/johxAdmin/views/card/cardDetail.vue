<template>
  <modal :show.sync='show' :title="'生成 '+cardData.subject+' 卡片'" :callback='sendPaycard'>
    <div class="modal-body" slot='modal-body'>
      <!-- {{cardData |json }} -->
      <div class="row">
        <jo-input label="注册手机号" xs="12">
          <input type="text" class="form-control" v-model='cardData.orderPhone' :value='$route.query.orderPhone'>
        </jo-input>
        <jo-input label="价格" xs="12">
          <input type="text" class="form-control" v-model='cardData.orderMoney'>
        </jo-input>
      </div>
      <p class="text-center text-info info-title">显示信息</p>
      <div class="row">
        <single-info v-for='info in cardData.cardInfo' :info='info'></single-info>
      </div>
      <p class="text-center text-warning info-title">非显示信息</p>
      <div class="row">
        <single-info v-for="info in cardData.otherInfo" :info='info'>
        </single-info>
      </div>
    </div>
  </modal>
</template>
<script>
import {
  modal,
  joInput,
  joSearch,
  joPanel,
  joSplit,
} from 'jo'

// 将cardInfo 与 otherInfo 传入
import singleInfo from './singleInfo'
import {
  cardService
} from 'api'
export default {
  props: {
    show: {
      twoWay: true,
      type: Boolean
    },
    cardData: {
      type: Object,
      required: true
    },
    cardKey: {
      twoWay: true,
      required: true
    }
  },
  components: {
    modal,
    joInput,
    joSearch,
    joPanel,
    singleInfo
  },
  methods: {
    resetCardData() {
      this.cardData.orderMoney = ''
      this.cardData.cardInfo.forEach(info => {
        info.value = ''
      })
      this.cardData.otherInfo.forEach(info => {
        info.value = ''
      })
    },
    sendPaycard() {
      this.cardData.cardInfo.forEach(info => {
        if (info.key === '餐厅') {
          this.cardData.restInfo = info.value
          info.value = joSplit(info.value, ',')[0]
        }
      })
      cardService.createCard(Object.assign(this.cardData, this.$route.query))
        .then(res => {
          this.show = false
          this.cardKey = res.card
          this.resetCardData()
          this.showAlert('生成卡片成功!请点击复制秘钥')
        })
    },
    showAlert(msg) {
      this.$root.$emit('showAlert', msg)
    },
  },
}
</script>
<style scoped>
.info-title {
  margin-top: 10px;
}
</style>
