<template>
  <div>
    <div class="page-header">
      <h4>九宫格服务 <jo-loading :loading="$loadingAsyncData"></jo-loading><button class="btn btn-primary" @click='showAdd=true'><i class="fa fa-plus"></i>添加九宫格</button></h4>
    </div>
    <sudoku-panel v-if='showAdd' :show.sync='showAdd' mode='add' :refresh-list.sync='refreshList'></sudoku-panel>
    <sudoku-panel v-if='showEdit' :show.sync='showEdit' mode='edit' :selected-id='selectedSudokuId' :refresh-list.sync='refreshList'></sudoku-panel>
    <!-- {{sudokuList|json}} -->
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
  sudokuService
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
      selectedSudokuId: 0
    }
  },
  asyncData(resolve, reject) {
    sudokuService.getSudokus()
      .then(sudokuList => resolve({
        sudokuList
      }))
  },
  watch: {
    'refreshList': 'reloadAsyncData'
  },
  methods: {
    tableClick(e, row, type) {
      if (type === 'edit') this.handleEdit(row.sudokuId)
      if (type === 'under') this.handleUnder(row.sudokuId)
    },
    handleEdit(sudokuId) {
      this.selectedSudokuId = sudokuId
      this.showEdit = true
    },
    handleUnder(sudokuId) {
      if (window.confirm('是否确认下线')) sudokuService.deleteSudoku(sudokuId).then(res => this.updateList('下线九宫格成功!'))
    },
    updateList(msg) {
      this.refreshList += 1
      this.$root.$emit('showAlert', msg)

    }
  }
}
</script>
