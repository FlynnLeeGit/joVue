<template>
  <modal :show.sync='show' effect="fade" :callback='confirm'>
    <div class="modal-header" slot='modal-header'>
      <h3>填写优惠券信息</h3>
    </div>
    <!-- body -->
    <div class="modal-body" slot='modal-body'>
      <div class="row">
        <jo-input sm="12" label="优惠券品类">
          <select v-model='editData.cateType' class="form-control" :read-only='isList'>
            <option v-for='o in 5'>{{o}}</option>
          </select>
        </jo-input>
        <jo-input sm="6" label='优惠金额 满'>
          <input v-model='editData.conditionMoney' class="form-control" type="number" :read-only='isList'>
        </jo-input>
        <jo-input sm="6" label='减'>
          <input v-model='editData.couponMoney' class="form-control" type="number" :read-only='isList'>
        </jo-input>
        <jo-input sm='12'>
          <div slot='label'>
            <input v-model='editData.showContent' type="checkbox" :read-only='isList'>
            <span>显示内容</span>
          </div>
          <input v-model='editData.content' class="form-control" type="text" :read-only='isList'>
        </jo-input>
        <jo-input sm='4' label="数量">
          <input v-model='editData.num' type="number" class="form-control" :read-only='isList'>
        </jo-input>
        <jo-input sm='4' label="截止时间">
          <select v-model='editData.availableMonths' class="form-control" :read-only='isList'>
            <option v-for='o in 3'>{{o}}</option>
          </select>
        </jo-input>
        <jo-input sm='12' label="使用备注">
          <textarea v-model='editData.notice' class="form-control" rows='3' :read-only='isList'></textarea>
        </jo-input>
        <jo-single-img :img.sync='editData.imgUrl' :server='requestServer'></jo-single-img>
      </div>
    </div>
  </modal>
</template>
<script>
import {
  joInput,
  joSingleImg,
  modal,
} from 'jo'
const server = window.server
export default {
  props: ['show', 'data'],
  components: {
    modal,
    joInput,
    joSingleImg
  },
  data() {
    return {
      editData: Object.assign({}, this.data),
      requestServer: `${server}/qiniu/upload/0`
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
      console.log('add')
    }
  }
}
</script>
