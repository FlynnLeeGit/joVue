<template>
  <div>
    <modal :show.sync='show' effect='zoom' :callback='confirm'>
      <div class="modal-header" slot='modal-header'>
        <h4>宣传图片面板{{mode}}<jo-loading :loading='$loadingAsyncData'></jo-loading></h4>
      </div>
      <div class="modal-body row" slot="modal-body">
        {{editData|json}}
        <jo-input label="宣传时间范围" sm='12'>
          <jo-datetime :value.sync='editData.pubStart' ph='开始'></jo-datetime>
          <jo-datetime :value.sync='editData.pubEnd' ph='结束'></jo-datetime>
        </jo-input>
        <jo-input label="询问语" sm='6'>
          <textarea class="form-control" rows="5" v-model="editData.pubIntro"></textarea>
        </jo-input>
        <div class="col-sm-6">
          <jo-single-img :img.sync='editData.pubImg' :server='requestServer'></jo-single-img>
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
const server = window.server
import {
  vipService
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
      type: Number,
      twoWay: true
    },
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
      requestServer: `${server}/qiniu/upload/0`,
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
    updateList(msg) {
      this.show = false
      this.reloadList += 1
      this.$root.$emit('showAlert', msg)
    },
    confirm() {
      if (this.isAdd) vipService.insertPartner(this.editData)
        .then(res => this.updateList('新增宣传活动成功!'))

      if (this.isEdit) vipService.updatePartner(this.editData)
        .then(res => this.updateList('更新宣城活动成功!'))
    }
  },
  asyncData(resolve, reject) {
    vipService.getVips()
      .then(list => resolve({
        memberOpts: list.map(val => val.memberMoney)
      }))
    if (this.isEdit) vipService.getOnePartner(this.id)
      .then(editData => resolve({
        editData
      }))
  }
}
</script>
