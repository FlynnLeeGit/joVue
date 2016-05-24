<template>
  <modal effect="fade" :show.sync="show" :small='true' :callback='confirm' :title="isAdd?'会员添加':'会员编辑'">
    <div class="modal-body row" slot="modal-body">
      <!-- {{editData|json}} -->
      <jo-input sm='12' label="会员描述">
        <input v-model='editData.memberLevel' type="text" class="form-control">
      </jo-input>
      <jo-input sm='12' label="会员价格" after='元'>
        <input v-model='editData.memberMoney' type="number" class="form-control">
      </jo-input>
    </div>
  </modal>
</template>
<script>
import {
  joInput,
  modal
} from 'jo'
import {
  vipService
} from 'api'

export default {
  props: ['show', 'data', 'mode', 'refreshList'],
  components: {
    modal,
    joInput
  },
  computed: {
    isEdit() {
      return this.mode === 'edit'
    },
    isAdd() {
      return this.mode === 'add'
    }
  },
  data() {
    return {
      editData: Object.assign({}, this.data)
    }
  },
  methods: {
    updateList(msg) {
      this.refreshList += 1
      this.show = false
      this.$root.$emit('showAlert', msg)
    },
    confirm() {
      if (this.isAdd) vipService.insertVip(this.editData)
        .then(res => this.updateList('添加会员成功'))
      if (this.isEdit) vipService.updateVip(this.editData)
        .then(res => this.updateList('更新会员成功'))
    }
  }

}
</script>
