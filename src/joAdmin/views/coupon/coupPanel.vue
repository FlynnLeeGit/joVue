<template>
  <modal :show.sync="show" effect="fade" :callback='confirm'>
    <div class="modal-header" slot="modal-header">
      <h4>优惠券面板{{isAdd?'添加':'编辑'}}</h4>
    </div>
    <div class="modal-body row" slot="modal-body">
      <jo-input label="合作商" sm="8">
        <select class="form-control">
          <option>1</option>
        </select>
      </jo-input>
      <jo-input label="优惠品类" sm="8">
        <select class="form-control">
          <option value="">1</option>
        </select>
      </jo-input>
      <jo-input label="用户限制" sm="8">
        <jo-checkbox label="全部用户" v-for='n in 3'></jo-checkbox>
      </jo-input>
      <jo-input label="优惠名称" sm="8">
        <input type="text" class="form-control">
      </jo-input>
      <jo-input label="优惠条件 满" sm="7">
        <input type="number" class="form-control">
      </jo-input>
      <jo-input label="减" sm="5">
        <input type="number" class="form-control">
      </jo-input>
      <jo-input label="兑换截止" sm="8">
        <input type="text" class="form-control">
      </jo-input>
      <jo-input label="生成数量" sm="8">
        <select class="form-control">
          <option v-for='o in 10'>{{o}}</option>
        </select>
      </jo-input>
    </div>
  </modal>
</template>
<script>
import {
  joInput,
  joCheckbox,
  modal
} from 'jo'
export default {
  props: ['show', 'mode', 'data'],
  components: {
    joInput,
    joCheckbox,
    modal
  },
  data() {
    return {
      editData: Object.assign({}, this.data)
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
      if (this.isAdd) {
        console.log('add')
      }
      if (this.isEdit) {
        console.log('edit')
      }
    }
  }
}
</script>
