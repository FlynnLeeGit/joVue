<template>
  <div>
    <div class="page-header">
      <h4>生活服务列表 <jo-loading :loading="$loadingAsyncData"></jo-loading><button @click='showAdd=true' class="btn btn-warning btn-sm"><i class="fa fa-plus"></i>新增服务商家</button></h4>
    </div>
    <add-panel v-if='showAdd' :reload.sync='reload' :show.sync='showAdd'>
    </add-panel>
    <edit-panel v-if='showEdit' :reload.sync='reload' :show.sync='showEdit' :life-id='selectedRecordId'>
    </edit-panel>
    <coup-panel v-if='showCoup' :show.sync='showCoup' :data='selectedRecord'>
    </coup-panel>
    <jo-table :data='lifelist' :option='lifeTableOpts' @trclick='tableClick'>
    </jo-table>
  </div>
</template>
<script>
import {
  joTable,
  lifelist,
  joLoading
} from 'jo'
import {
  lifeTableOpts
} from './lifeOpts'
import {
  lifeService
} from 'api'
import addPanel from './addPanel'
import editPanel from './editPanel'
import coupPanel from './coupPanel'
export default {
  components: {
    joTable,
    addPanel,
    editPanel,
    coupPanel,
    joLoading
  },
  data() {
    return {
      showAdd: false,
      showEdit: false,
      showCoup: false,
      reload: 0,
      selectedRecord: {},
      selectedRecordId: 0,
      lifeTableOpts,
      lifelist: []
    }
  },
  asyncData(resolve, reject) {
    lifeService.getAllLifes()
      .then(lifelist => resolve({
        lifelist
      }))
  },
  watch: {
    reload: 'reloadAsyncData'
  },
  methods: {
    tableClick(e, row, type) {
      if (type === 'edit') this.handleEdit(row.lifeId)
      if (type === 'coup') this.handleCoup(row)
    },
    handleEdit(lifeId) {
      this.selectedRecordId = lifeId
      this.showEdit = true
    },
    handleCoup(row) {
      this.showCoup = true
      this.selectedRecord = row
    }
  },
}
</script>
