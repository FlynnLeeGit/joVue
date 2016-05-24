<template>
  <div>
    <div class="page-header">
      <h4>九宫格服务 <jo-loading :loading="$loadingAsyncData"></jo-loading><button class="btn btn-primary" @click='showAdd=true'><i class="fa fa-plus"></i>添加九宫格</button></h4>
    </div>
    <sudoku-panel v-if='showAdd' :show.sync='showAdd' mode='add' :refresh-list.sync='refreshList'></sudoku-panel>
    <sudoku-panel v-if='showEdit' :show.sync='showEdit' mode='edit' :selected-id='selectedSerId' :refresh-list.sync='refreshList'></sudoku-panel>
    <jo-table :data="sudokuList" @trclick='tableClick' :option="sudokuTableOpts"></jo-table>
  </div>
</template>
<script>
import {
  modal
} from 'vue-strap'
import sudokuPanel from './sudokuPanel'
import {
  joTable,
  joLoading
} from 'jo'
import {
  vipService
} from 'api'
import {
  sudokuTableOpts
} from './sudokuOpts'

export default {
  components: {
    sudokuPanel,
    joTable,
    joLoading
  },
  data() {
    return {
      showAdd: false,
      showEdit: false,
      refreshList: 0,
      sudokuTableOpts,
      sudokuList: [],
      selectedSerId: 0
    }
  },
  asyncData(resolve, reject) {
    vipService.getSerInfos().then(sudokuList => resolve({
      sudokuList
    }))
  },
  watch: {
    'refreshList': 'reloadAsyncData'
  },
  methods: {
    tableClick(e, row, type) {
      if (type === 'edit') this.handleEdit(row.serId)
      if (type === 'under') this.handleUnder(row.serId)
    },
    handleEdit(serId) {
      this.selectedSerId = serId
      this.showEdit = true
    },
    handleUnder(serId) {
      if (window.confirm('是否确认下线')) vipService.deleteSerInfo(serId).then(res => this.updateList('下线服务成功!'))
    },
    updateList(msg) {
      this.refreshList += 1
      this.$root.$emit('showAlert', msg)

    }
  }
}
</script>
