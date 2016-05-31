<template>
  <div>
    <div class="page-header">
      <h4>管家合作商<jo-loading :loading="$loadingAsyncData"></jo-loading><button class="btn btn-primary" @click='showAdd=true'><i class="fa fa-plus"></i> 添加合作商</button></h4>
    </div>
    <!-- 新增面板 -->
    <partner-panel v-if='showAdd' :show.sync='showAdd' mode='add' :reload-list.sync='reloadList' :jo-alert.sync='joAlert'></partner-panel>
    <!-- 编辑面板 -->
    <partner-panel v-if='showEdit' :show.sync='showEdit' mode='edit' :id='selectedRecordId' :reload-list.sync='reloadList' :jo-alert.sync='joAlert'></partner-panel>
    <!-- 合作商列表 -->
    <jo-table :data="partnerList" @trclick='tableClick' :option="partnerTableOpts"></jo-table>
  </div>
</template>
<script>
import {
  modal
} from 'vue-strap'
import partnerPanel from './partnerPanel'
import {
  joTable,
  joLoading,
} from 'jo'
import {
  partnerTableOpts
} from './partnerOpts'
import {
  vipService
} from 'api'
const server = window.server
export default {
  components: {
    partnerPanel,
    joTable,
    joLoading,
  },
  data() {
    return {
      showAdd: false,
      showEdit: false,
      partnerTableOpts,
      reloadList: 0,
      selectedRecordId: 0,
      partnerList: [],
    }
  },
  asyncData(resolve, reject) {
    vipService.getPartners()
      .then(partnerList => resolve({
        partnerList
      }))
  },
  methods: {
    tableClick(e, row, type) {
      if (type === 'edit') this.handleEdit(row.partnerId)
      if (type === 'delete') this.handleDelete(row.partnerId)
    },
    handleEdit(partnerId) {
      this.selectedRecordId = partnerId
      this.showEdit = true
    },
    handleDelete(partnerId) {
      if (window.confirm('确认删除')) vipService.deletePartner(partnerId)
        .then(res => this.updateList('删除合作商成功!'))
    },
    updateList(msg) {
      this.reloadList += 1
      this.$root.$emit('showAlert', msg)
    }
  },
  watch: {
    reloadList: 'reloadAsyncData'
  }
}
</script>
