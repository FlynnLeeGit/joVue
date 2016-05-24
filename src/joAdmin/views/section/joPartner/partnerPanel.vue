<template>
  <div>
    <modal :show.sync='show' effect='zoom' :callback='confirm'>
      <div class="modal-header" slot='modal-header'>
        <h4>合作商面板{{mode}}<jo-loading :loading='$loadingAsyncData'></jo-loading></h4>
      </div>
      <div class="modal-body" slot="modal-body">
        <div class="row">
          <jo-input sm='12' label='合作商描述名称'>
            <input v-model='editData.partnerName' type="text" class="form-control">
          </jo-input>
          <jo-input sm='12' label='合作商缩写'>
            <input v-model='editData.shortName' type="text" maxlength="2" class="form-control" placeholder="最多两个字母">
          </jo-input>
          {{memberType}}
          <jo-input sm="12" label="会员价格等级" after='元'>
            <select v-model='editData.money' class="form-control">
              <option track-by='$index' v-for='m in memberOpts'>{{m}}</option>
            </select>
          </jo-input>
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
} from 'jo'
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
  },
  data() {
    return {
      editData: {},
      memberOpts: []
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
        .then(res => this.updateList('新增合作商成功!'))

      if (this.isEdit) vipService.updatePartner(this.editData)
        .then(res => this.updateList('更新合作商成功!'))
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
