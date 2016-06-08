<template>
  <modal :show.sync='show' :small='true' :callback='confirm' title='生成会员优惠券'>
    <div slot='modal-body' class="modal-body row">
      {{couponData|json}}
      <jo-input label='合作商会员选择' sm='12'>
        <select v-model='couponData.partnerId' class="form-control">
          <option v-for='o in partnerList' :value='o.partnerId'>{{o.memberName}}</option>
        </select>
      </jo-input>
      <jo-input label="合作商" sm="12">
        <input type="text" v-model='couponData.provider' class="form-control" disabled>
      </jo-input>
      <jo-input label='会员等级' sm='12'>
        <input type="text" v-model='couponData.vcouponMoney' class="form-control" disabled>
      </jo-input>
      <!-- ** -->
      <jo-input label="会员月数" sm="12">
        <input v-model='couponData.availableMonths' type="number" class="form-control" min="0">
      </jo-input>
      <jo-input label="兑换截止" sm="12">
        <jo-datetime :value.sync='couponData.expirDate'></jo-datetime>
      </jo-input>
      <jo-input label='邀请码标识' sm='12'>
        <input type="text" class="form-control" v-model='couponData._vcouponCode' maxlength='3' placeholder="三个字符标识">
      </jo-input>
      <jo-input label='生成数量' sm='12'>
        <select v-model='couponNum' class="form-control">
          <option v-for='n in 10' :>{{n+1}}</option>
        </select>
      </jo-input>
    </div>
  </modal>
</template>
<script>
import {
  modal,
  joLoading,
  joInput,
  joDatetime
} from 'jo'
import {
  v2CouponService,
  vipService
} from 'api'
export default {
  name: 'member-coupon-panel',
  props: {
    show: {
      type: Boolean,
      twoWay: true
    },
    reloadList: {
      type: Number,
      twoWay: true,
    }
  },
  components: {
    modal,
    joLoading,
    joInput,
    joDatetime
  },
  data() {
    return {
      couponData: {},
      partnerList: [],
      memberList: [],
      couponNum: 1,
    }
  },
  methods: {
    updateList(msg) {
      this.show = false
      this.reloadList += 1
      this.$root.$emit('showAlert', msg)
    },
    confirm() {
      v2CouponService.insertVipCoupon(this.couponData, this.couponNum)
        .then(this.updateList('添加会员券成功!'))
    }
  },
  asyncData(resolve, reject) {
    Promise.all([vipService.getPartners(), vipService.getVips()])
      .then(([partnerList, memberList]) => resolve({
        partnerList,
        memberList
      }))
  },
  watch: {
    'couponData._vcouponCode' (newVal) {
      this.$set('couponData.vcouponCode', 'v' + newVal)
    },
    'couponData.partnerId' (newPartnerId) {
      this.partnerList.forEach(par => {
        if (par.partnerId === newPartnerId) {
          this.$set('couponData.memberName', par.memberName)
          this.$set('couponData.memberId', par.memberId)
          this.$set('couponData.provider', par.partnerName)
          this.$set('couponData.vcouponMoney', par.money)
        }
      })
    }
  }
};
</script>
<style lang="css" scoped>
</style>
