<template>
  <div>
    <modal :show.sync='show' effect='zoom' :callback='confirm'>
      <div class="modal-header" slot='modal-header'>
        <h4>宣传图片面板{{mode}}<jo-loading :loading='$loadingAsyncData'></jo-loading></h4>
      </div>
      <div class="modal-body row" slot="modal-body">
        {{editData|json}}
        <jo-input label='活动名称' sm='8'>
          <input v-model='editData.acName' type="text" class="form-control" ph='活动名称' required>
        </jo-input>
        <jo-input label="宣传时间范围" sm='12'>
          <jo-datetime :value.sync='editData.startTime' ph='开始'></jo-datetime>
          <jo-datetime :value.sync='editData.endTime' ph='结束'></jo-datetime>
        </jo-input>
        <jo-input label="询问语" sm='6'>
          <textarea class="form-control" rows="5" v-model="editData.acAsk"></textarea>
        </jo-input>
        <div class="col-sm-6">
          <jo-single-img :img.sync='editData.acImg'></jo-single-img>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import {
  joInput,
  joLoading,
  modal,
  joDatetime,
  joSingleImg
} from 'jo'
import {
  activityService
} from 'api'
export default {
  props: {
    show: {
      twoWay: true,
      type: Boolean
    },
    mode: {
      type: String,
    },
    id: String,
    reloadList: {
      twoWay: true,
      type: Number
    }
  },
  components: {
    modal,
    joInput,
    joLoading,
    joDatetime,
    joSingleImg
  },
  data() {
    return {
      editData: {},
      memberOpts: [],
    }
  },
  computed: {
    isAdd() {
      return this.mode === 'add'
    },
    isEdit() {
      return this.mode === 'edit'
    }
  },
  methods: {
    confirm() {
      if (this.isAdd) activityService.insertActivity(this.editData)
        .then(res => this.updateList('新增宣传活动成功!'))
      if (this.isEdit) activityService.updateActivity(this.editData)
        .then(res => this.updateList('更新宣城活动成功!'))
    },
    updateList(msg) {
      this.show = false
      this.reloadList += 1
      this.$root.$emit('showAlert', msg)
    }
  },
  asyncData(resolve, reject) {
    if (this.isAdd) resolve()
    if (this.isEdit) activityService.getOneActivity(this.id)
      .then(editData => resolve({
        editData
      }))
  }
}
</script>
