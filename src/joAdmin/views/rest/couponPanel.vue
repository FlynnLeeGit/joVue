<template>
  <div>
    <modal size="small" :show.sync='show'>
      <div class="modal-header" slot='modal-header'>
        <h3>生成优惠券</h3> {{coup|json}}
      </div>
      <div class="modal-body row" slot='modal-body'>
        <jo-input sm='8' label="优惠券名称">
          <input type="text" class="form-control" v-model='coup.cateName' />
        </jo-input>
        <jo-input sm="6" label="优惠条件满">
          <input v-model='coup.conditionMoney' type="number" class="form-control">
        </jo-input>
        <jo-input sm="6" label="减">
          <input v-model='coup.couponMoney' type="number" class="form-control">
        </jo-input>
        <jo-input sm="8" label="餐厅验证码">
          <input v-model='coup.restCode' type="text" class="form-control">
        </jo-input>
        <jo-input sm="8" label="可用月数">
          <input v-model='coup.availableMonths' type="number" class="form-control">
        </jo-input>
        <jo-input sm="12" label="使用须知">
          <textarea v-model='coup.notice' rows="3" class="form-control"></textarea>
        </jo-input>
        <jo-input sm='8' label='生成数量'>
          <select class="form-control" v-model='couponNum'>
            <option v-for='n in 10'>{{n+1}}</option>
          </select>
        </jo-input>
      </div>
      <div class="modal-footer" slot='modal-footer'>
        <button @click='show=false' class="btn btn-default">关闭</button>
        <button @click='confirm' class="btn btn-primary">提交</button>
      </div>
    </modal>
  </div>
</template>
<script>
import {
  joInput,
  modal
} from 'jo'
import {
  v2CouponServie
} from 'api'
export default {
  props: ['show', 'data'],
  components: {
    modal,
    joInput
  },
  data() {
    return {
      coup: {
        cateName: this.data.restName,
        cateId: this.data.restId
      },
      couponNum: 1
    }
  },
  methods: {
    confirm() {
      v2CouponServie.insertRestCoupon(this.coup, this.couponNum)
        .then(res => {
          this.show = false
          this.$root.$emit('showAlert', res.msg)
        })
    },

  }
}
</script>
