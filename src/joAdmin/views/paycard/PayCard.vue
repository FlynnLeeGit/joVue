<template>
  <div>
    <div class="page-header">
      <h4>卡片模版管理
      <button @click='changeMode' :class="['btn','btn-lg',isTemplate?'btn-info':'']">
      {{isTemplate?'编辑模式':'填写模式'}}=></button>

      <button @click='this.showAddService = true' v-if="isTemplate" class="btn btn-success">
        <i class="fa fa-plus"></i> 添加自定义服务
      </button>
      </h4>
    </div>
    <ul v-if='!$loadingAsyncData' class="nav nav-tabs">
      <li @click='changeTab($index)' :class="{active:selectedId===$index}" @click='' v-for='s in subjects'>
        <a href="javascript:;">
          <span>{{s.subject}}</span>
        </a>
      </li>
    </ul>
    <hr />
    <add-ser-panel v-if='showAddService' :show.sync='showAddService'></add-ser-panel>
    <common-card v-if='!$loadingAsyncData' :mode='mode' :subject.sync='subjects[selectedId]' :refresh-list.sync='refreshList' :privilege-data='privilegeData'>
      <button slot='delBtn' @click='del(subjects[selectedId].templateId)' class="btn btn-danger">
        <i class="fa fa-close"></i> 删除当前服务
      </button>
    </common-card>
  </div>
</template>
<script>
import {
  cardService,
  vipService
} from 'api'
import commonCard from './commonCard'
import addSerPanel from './addSerPanel'

export default {
  components: {
    commonCard,
    addSerPanel
  },
  data() {
    return {
      mode: 'pay',
      showAddService: false,
      subjects: [],
      selectedId: 0,
      refreshList: 0,
      privilegeData: {}
    }
  },
  computed: {
    isTemplate() {
      return this.mode === 'template'
    },
    isPay() {
      return this.mode === 'pay'
    }
  },
  events: {
    'addCard' (serObj) {
      this.subjects.push({
        subject: serObj.serName,
        serId: serObj.serId,
        serOriginal:serObj.serOriginal,
        chargeOriginal:serObj.chargeOriginal,
        orderPhone: '',
        orderMoney: '',
        cardInfo: [],
        otherInfo: [{
          key: '用户',
          value: ''
        }, {
          key: '备注',
          value: ''
        }]
      })
      this.selectedId = this.subjects.length - 1
    }
  },
  methods: {
    changeMode() {
      this.isPay ? this.mode = 'template' : this.mode = 'pay'
    },
    changeTab(index) {
      this.selectedId = index
      this.getP()
    },
    getP() {
      vipService.getPrivilege(this.$route.query.accountId, this.subjects[this.selectedId].serId)
        .then(res => {
          this.privilegeData = res
        })
    },
    del(templateId) {
      if (window.confirm('是否删除服务?')) cardService.deleteTemplate(templateId).then(res => {
        this.$root.$emit('showAlert', '删除模板成功')
        this.refreshList++
          this.selectedId = 0
      })
    }
  },
  asyncData(resolve, reject) {
    cardService.getTemplates().then(subjects => {
      resolve({
        subjects
      })
      this.getP()
    })
  },
  watch: {
    refreshList: 'reloadAsyncData'
  }
}
</script>
