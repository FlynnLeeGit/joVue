<template>
  <div>
    <div class="page-header">
      <h4>管家服务 <jo-loading :loading="$loadingAsyncData"></jo-loading><button class="btn btn-primary" @click='showAdd=true'><i class="fa fa-plus"></i>添加服务</button></h4>
    </div>
    <service-panel v-if='showAdd' :show.sync='showAdd' mode='add' :refresh-list.sync='refreshList'></service-panel>
    <service-panel v-if='showEdit' :show.sync='showEdit' mode='edit' :selected-id='selectedSerId' :refresh-list.sync='refreshList'></service-panel>
    <jo-table :data="serviceList" @trclick='tableClick' :option="serviceTableOpts"></jo-table>
    {{a}}
  </div>
</template>
<script>
import {
  modal
} from 'vue-strap'
import servicePanel from './servicePanel'
import {
  joTable,
  joLoading
} from 'jo'
import {
  vipService
} from 'api'
import {
  serviceTableOpts
} from './serviceOpts'

export default {
  components: {
    servicePanel,
    joTable,
    joLoading
  },
  data() {
    return {
      showAdd: false,
      showEdit: false,
      refreshList: 0,
      serviceTableOpts,
      serviceList: [],
      selectedSerId: 0
    }
  },
  asyncData(resolve, reject) {
    vipService.getSerInfos().then(serviceList => resolve({
      serviceList
    }))
  },
  watch: {
    'refreshList': 'reloadAsyncData'
  },
  methods: {
    tableClick(e, row, type) {
      if (type === 'edit') this.handleEdit(row.serId)
      if (type === 'delete') this.handleDelete(row.serId)
    },
    handleEdit(serId) {
      this.selectedSerId = serId
      this.showEdit = true
    },
    handleDelete(serId) {
      if (window.confirm('是否确认删除')) vipService.deleteSerInfo(serId).then(res => this.updateList('删除服务成功!'))
    },
    updateList(msg) {
      this.refreshList += 1
      this.$root.$emit('showAlert', msg)

    }
  }
}
</script>
