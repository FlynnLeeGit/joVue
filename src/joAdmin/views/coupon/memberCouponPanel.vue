<template>
  <modal :show.sync='show' :small='true' :callback='confirm' title='生成会员优惠券'>
    <div slot='modal-body' class="modal-body row">
      {{couponData|json}}
      <jo-input label='合作商会员' sm='12'>
        <select v-model='couponData.partner' class="form-control">
          <option v-for='o in partnerList' :value="o.partnerId">{{o.memberName}}</option>
        </select>
      </jo-input>
      <jo-input label="合作商" sm="12">
        <select v-model='couponData.member' class="form-control">
          <option v-for='o in memberList' :value="o.memberId">{{o.memberLevel}} {{o.memberMoney}}</option>
        </select>
      </jo-input>
      <jo-input label='会员用户' sm='12'>
        <input type="text" class="form-control" readonly>
      </jo-input>
      <jo-input label="会员月数" sm="12">
        <input v-model='couponData.month' type="number" class="form-control" min="0">
      </jo-input>
      <jo-input label="兑换截止" sm="12">
        <jo-datetime :value.sync='couponData.exp'></jo-datetime>
      </jo-input>
      <jo-input label='邀请码标识' sm='12'>
        <input type="text" class="form-control" v-model='couponData._invite' maxlength='3' placeholder="三个字符标识">
      </jo-input>
      <jo-input label='生成数量' sm='12'>
        <select v-model='couponData.num' class="form-control">
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
      memberList: []
    }
  },
  methods: {
    updateList(msg) {
      this.show = false
      this.reloadList += 1
      this.$root.$emit('showAlert', msg)
    },
    confrim() {
      log('生成')
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
    'couponData._invite' (newVal) {
      this.$set('couponData.invite', 'v' + newVal)
    }
  }
};
</script>
<style lang="css" scoped>
</style>
