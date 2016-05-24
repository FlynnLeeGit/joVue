<template>
  <div>
    <div class="page-header">
      <h4>宣传图片管理<jo-loading :loading="$loadingAsyncData"></jo-loading><button class="btn btn-primary" @click='showAdd=true'><i class="fa fa-plus"></i> 添加宣传活动</button></h4>
    </div>
    {{joAlert|json}}
    <!-- 新增面板 -->
    <publicity-panel v-if='showAdd' :show.sync='showAdd' mode='add' :reload-list.sync='reloadList' ></publicity-panel>
    <!-- 编辑面板 -->
    <publicity-panel v-if='showEdit' :show.sync='showEdit' mode='edit' :id='selectedRecordId' :reload-list.sync='reloadList'></publicity-panel>
    <!-- 合作商列表 -->
    <jo-table :data="publicityList" @trclick='tableClick' :option="publicityTableOpts"></jo-table>
  </div>
</template>
<script>
import {
  modal
} from 'vue-strap'
import publicityPanel  from './publicityPanel'
import {
  joTable,
  joLoading,
} from 'jo'
import {
  publicityTableOpts
} from './publicityOpts'
import {
  vipService
} from 'api'

export default {
  components: {
    publicityPanel,
    joTable,
    joLoading,
  },
  data() {
    return {
      showAdd: false,
      showEdit: false,
      publicityTableOpts,
      reloadList: 0,
      selectedRecordId: 0,
      publicityList: [],
    }
  },
  asyncData(resolve, reject) {
    vipService.getPartners()
      .then(publicityList => resolve({
        publicityList
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
        .then(res => this.updateList('删除宣传成功!'))
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
