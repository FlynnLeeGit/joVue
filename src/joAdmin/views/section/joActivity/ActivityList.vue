<template>
  <div>
    <div class="page-header">
      <h4>宣传活动管理<jo-loading :loading="$loadingAsyncData"></jo-loading><button class="btn btn-primary" @click='showAdd=true'><i class="fa fa-plus"></i> 添加宣传活动</button></h4>
    </div>
    <!-- 新增面板 -->
    <activity-panel v-if='showAdd' :show.sync='showAdd' mode='add' :reload-list.sync='reloadList'></activity-panel>
    <!-- 编辑面板 -->
    <activity-panel v-if='showEdit' :show.sync='showEdit' mode='edit' :id='selectedRecordId' :reload-list.sync='reloadList'></activity-panel>
    <!-- 合作商列表 -->
    <jo-table :data="activityList" @trclick='tableClick' :option="activityTableOpts"></jo-table>
  </div>
</template>
<script>
import {
  modal
} from 'vue-strap'
import activityPanel from './activityPanel'
import {
  joTable,
  joLoading,
} from 'jo'
import {
  activityTableOpts
} from './activityOpts'
import {
  activityService
} from 'api'

export default {
  components: {
    activityPanel,
    joTable,
    joLoading,
  },
  data() {
    return {
      showAdd: false,
      showEdit: false,
      activityTableOpts,
      reloadList: 0,
      selectedRecordId: 0,
      activityList: [],
    }
  },
  asyncData(resolve, reject) {
    activityService.getAllActivity()
      .then(activityList => resolve({
        activityList
      }))
  },
  methods: {
    tableClick(e, row, type) {
      if (type === 'edit') this.handleEdit(row.activityId)
      if (type === 'down') this.handleDelete(row.activityId)
      if (type === 'up') this.handleUp(row.activityId)
    },
    handleEdit(activityId) {
      this.selectedRecordId = activityId
      this.showEdit = true
    },
    handleDelete(activityId) {
      if (window.confirm('确认删除')) activityService.deleteActivity(activityId)
        .then(res => this.updateList('删除宣传成功!'))
    },
    handleUp(activityId) {
      activityService.upActivity(activityId)
        .then(res => this.updateList('重新上线成功'))
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
