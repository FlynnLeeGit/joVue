<template>
  <div>
    <div class='col-xs-12 col-sm-8'>
      <!-- 基本信息 -->
      <jo-panel theme="primary" title='基本信息'>
        <div slot='body'>
          <jo-input label="注册手机号" xs="12">
            <input type="number" v-model='mobile' placeholder="请至用户列表中点击(生成卡片)" class="form-control" :disabled="isTemplate">
          </jo-input>
          <jo-input label="价格" xs="12">
            <input type="number" v-model='subject.orderMoney' class="form-control" :disabled="isTemplate">
          </jo-input>
          <jo-input label="商品费(原价)" xs="12">
            <input type="number" v-model='subject.serOriginal' class="form-control" :disabled="isTemplate">
          </jo-input>
          <jo-input label="服务费(原价)" xs="12">
            <input type="number" v-model='subject.chargeOriginal' class="form-control" :disabled="isTemplate">
          </jo-input>
          <jo-input label="特权价格" xs="12">
            <input type="number" v-model='subject.serPrice' class="form-control" :disabled="isTemplate" :value='privilegeData?privilegeData.serPrice:0'>
          </jo-input>
          <jo-input label="特权服务费" xs="12">
            <input type="number" v-model='subject.serCharge' class="form-control" :disabled="isTemplate" :value='privilegeData?privilegeData.serCharge:0'>
          </jo-input>
        </div>
      </jo-panel>
      <!-- 显示在前台信息 -->
      <jo-panel theme="info" title='显示信息'>
        <div slot='body'>
          <button class="btn btn-info btn-sm" @click="add(subject.cardInfo)" v-if="isTemplate"><i class="fa fa-plus"></i>添加显示信息</button>
          <div class="row" v-for='info in subject.cardInfo'>
            <div class="col-xs-8">
              <card-info :info.sync='info' :mode='mode'></card-info>
            </div>
            <div class="col-xs-4" v-if="isTemplate">
              <button class="btn btn-default btn-xs" @click="swapItem(subject.cardInfo,$index,$index-1)"><i class="fa fa-arrow-up"></i></button>
              <button class="btn btn-default btn-xs" @click="swapItem(subject.cardInfo,$index,$index+1)"><i class="fa fa-arrow-down"></i></button>
              <button class="btn btn-primary btn-xs" @click="subject.otherInfo.push(subject.cardInfo.splice($index, 1)[0])">切换显示</button>
              <button class="btn btn-danger btn-xs" @click="del($index,subject.cardInfo)">删除</button>
            </div>
          </div>
        </div>
      </jo-panel>
      <!-- 非显示信息 -->
      <jo-panel theme="default" title='非显示信息'>
        <div slot='body'>
          <button class="btn btn-sm" @click="add(subject.otherInfo)" v-if="isTemplate"><i class="fa fa-plus"></i>添加非显示信息</button>
          <div class="row" v-for='info in subject.otherInfo'>
            <div class="col-xs-8">
              <card-info :info.sync='info' :mode='mode'></card-info>
            </div>
            <div class="col-xs-4" v-if="isTemplate">
              <button class="btn btn-primary btn-xs" @click="subject.cardInfo.push(subject.otherInfo.splice($index, 1)[0])">切换显示</button>
              <button class="btn btn-danger btn-xs" @click="del($index,subject.otherInfo)">删除</button>
            </div>
          </div>
        </div>
      </jo-panel>
      <div v-if='isPay'>
        <jo-input label='复制密钥'>
          <textarea rows='5' v-el:cardkey type="text" v-model='cardKey' class="form-control"></textarea>
        </jo-input>
        <button @click='sendPayCard' class="btn btn-lg btn-primary">
          生成卡片
        </button>
        <button @click='copyCardkey' class="btn btn-lg btn-info">
          复制消息
        </button>
      </div>
      <div v-if='isTemplate' style='display:inline-block'>
        <button v-if="subject.templateId" @click='updateTemplate' class="btn btn-lg btn-warning">更新当前模版</button>
        <button v-else="subject.templateId" @click='insertTemplate' class="btn btn-lg btn-info">新增当前模版</button>
      </div>
      <slot v-if='isTemplate' name='delBtn'></slot>
    </div>
    <div class="col-xs-3">
      <h4>会员特权信息</h4>
      <div v-if='privilegeData'>
        <p><span class="text-primary">免费次数:</span>{{privilegeData.freeCount}}</p>
        <p><span class="text-primary">特权标签:</span>{{privilegeData.label}}</p>
        <p><span class="text-primary">特权价格:</span>{{privilegeData.serPrice | currency '¥'}}</p>
        <p><span class="text-primary">特权服务费:</span>{{privilegeData.serCharge | currency '¥'}}</p>
        <p><span class="text-primary">是否免费:</span>{{privilegeData.isFree}}</p>
      </div>
      <p v-else>查询不到 请检查是否传入accountId 和 serId</p>
    </div>
  </div>
</template>
<script>
import {
  joInput,
  joPanel,
  joSplit,
  joReset,
} from 'jo'
log(joReset)
import {
  cardService,
  vipService
} from 'api'

export default {
  props: ['subject', 'mode', 'refreshList', 'privilegeData'],
  components: {
    joInput,
    joPanel,
    cardInfo: require('./cardInfo')
  },
  data() {
    return {
      cardKey: '',
      restList: []
    }
  },
  computed: {
    isTemplate() {
      return this.mode === 'template'
    },
    isPay() {
      return this.mode === 'pay'
    },
    isRest() {
      return this.subject.subject === '餐厅'
    },
    mobile() {
      this.subject.orderPhone = this.$route.query.mobile
      return this.$route.query.mobile
    }
  },
  methods: {
    copyCardkey() {
      this.$els.cardkey.select()
      window.getSelection()
      document.execCommand('copy', 'true')
      this.showAlert('复制成功!可直接黏贴了!')
    },
    add(infoArr) {
      let k = window.prompt('请填写自定义字段名称')
      if (k) infoArr.push({
        key: k,
        value: ''
      })
    },
    del(index, infoArr) {
      if (window.confirm('确认删除？')) infoArr.splice(index, 1)
    },
    swapItem(infoArr, index1, index2) {
      if (index2 < infoArr.length && index2 >= 0) infoArr[index1] = infoArr.splice(index2, 1, infoArr[index1])[0]
    },
    resetTpl() {
      return joReset(this.subject, ['subject', 'key', 'serId', 'templateId', 'type', 'serPrice', 'serCharge', 'serOriginal', 'chargeOriginal'])
    },
    insertTemplate() {
      cardService.insertTemplate(this.resetTpl())
        .then(res => this.updateTemplateList('新增模板成功!'))
    },
    updateTemplate() {
      cardService.updateTemplate(this.resetTpl())
        .then(res => this.updateTemplateList('更新模板成功!'))
    },
    showAlert(msg) {
      this.$root.$emit('showAlert', msg)
    },
    updateTemplateList(msg) {
      this.refreshList += 1
      this.showAlert(msg)
    },
    sendPayCard() {
      this.subject.isVip = this.$route.query.isVip
      this.subject.accountId = this.$route.query.accountId

      this.subject.cardInfo.forEach((info) => {
        if (info.key === '餐厅') {
          this.subject.restInfo = info.value
          info.value = joSplit(info.value, ',')[0]
        }
      })
      cardService.createCard(this.subject)
        .then(res => {
          this.cardKey = res.card
          this.subject = this.resetTpl()
          this.showAlert('发送卡片成功!')
          this.$router.go({
            name: 'PayCard'
          })
        })
    }
  }
}
</script>
