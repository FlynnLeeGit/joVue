<template>
  <modal :show.sync='show' effect="fade" :callback='submit'>
    <div class="modal-header" slot='modal-header'>
      <h4>生成优惠券</h4>
    </div>
    <div class="modal-body row" slot='modal-body'>
      <jo-input sm="8" label='优惠券名称'>
        <input v-model='coup.cateName' class="form-control" type="text">
      </jo-input>
      <jo-input sm='6' label="优惠条件 满">
        <input v-model='coup.conditionMoney' class="form-control" type="number">
      </jo-input>
      <jo-input sm='4' label="减">
        <input v-model='coup.couponMoney' class="form-control" type="number">
      </jo-input>
      <jo-input sm='6' label="服务验证码">
        <input v-model='coup.restCode' class="form-control" type="text">
      </jo-input>
      <jo-input sm='4' label="可用月份数">
        <input v-model='coup.availableMonths' class="form-control" type="text">
      </jo-input>
      <jo-input sm='8' label="使用须知">
        <textarea v-model='coup.notice' class="form-control" rows="5"></textarea>
      </jo-input>
      <jo-input sm='8' label='生成数量'>
        <select class="form-control" v-model='couponNum'>
          <option v-for='n in 10'>{{n+1}}</option>
        </select>
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
  v2CouponService
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
        cateName: this.data.lifeName,
        cateId: this.data.lifeId
      },
      couponNum: 1
    }
  },
  methods: {
    submit() {
      v2CouponService.insertLifeCoupon(this.coup, this.couponNum)
        .then(res => {
          this.$root.$emit('showAlert', `生成${this.couponNum}张优惠券成功`)
          this.show = false
        })
    }
  }
}
</script>
