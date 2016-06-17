<template>
  <div>
    <div class="page-header">
      <h4>会员等级管理 <jo-loading :loading="$loadingAsyncData"></jo-loading><button @click='showAdd=true' class="btn btn-warning"><i class="fa fa-plus"></i>添加会员等级</button></h4>
    </div>
    <member-panel v-if="showAdd" :show.sync="showAdd" mode="add" :refresh-list.sync='refreshList'></member-panel>
    <member-panel v-if="showEdit" :show.sync="showEdit" :data='selectedRecord' mode="edit" :refresh-list.sync='refreshList'></member-panel>
    <jo-table :data="datalist" @trclick='tableClick' :option='memberTableOpts'></jo-table>
    <jo-input label='123' after='3'>
      <input type="text" value='123' class="form-control">
    </jo-input>
  </div>
</template>
<script>
import {
  joTable,
  joLoading,
  joInput
} from 'jo'
import {
  vipService
} from 'api'

import memberPanel from './memberPanel'
import {
  memberTableOpts
} from './memberOpts'
export default {
  components: {
    memberPanel,
    joTable,
    joInput,
    joLoading
  },
  data() {
    return {
      msg: '12345',
      showAdd: false,
      showEdit: false,
      memberTableOpts,
      refreshList: 0,
      datalist: [],
      selectedRecord: {},
      htmlString: ''
    }
  },
  asyncData(resolve, reject) {
    vipService.getVips().then(datalist => resolve({
      datalist
    }))
  },
  methods: {
    paste() {
      this.htmlString = ''
    },
    tableClick(e, row, type) {
      if (type === 'edit') this.handleEdit(row)
    },
    handleEdit(row) {
      this.showEdit = true
      this.selectedRecord = row
    }
  },
  watch: {
    'refreshList': 'reloadAsyncData'
  }
}
</script>
