<template>
  <div>
    <div class="row">
      <jo-input label="餐厅名称" sm="6" md="4">
        <input name='restName' type="text" v-model='data.restName' class="form-control" required>
      </jo-input>
      <jo-input label="餐厅地区" sm="6" md="4">
        <select class="form-control" v-model='data.district'>
          <option v-for='district in districtOptions'>{{district}}</option>
        </select>
      </jo-input>
      <jo-input label="餐厅商圈" sm="6" md="4">
        <select class="form-control" v-model='data.hotArea'>
          <option v-for='hotArea in hotAreaOptions'>{{hotArea}}</option>
        </select>
      </jo-input>
      <jo-input label="餐厅地址" sm="12" md="8">
        <input v-model='data.address' type="text" class="form-control">
      </jo-input>
      <jo-input label="人均价格" sm="6" md="4" after="元">
        <input v-model='data.avgPrice' type="number" class="form-control">
      </jo-input>
      <jo-input label="餐厅菜系" sm="6" md="4">
        <select v-model='data.cuisineId' class="form-control">
          <option v-for='cuisine in cuisineIdOptions' :value='cuisine.value'>{{cuisine.text}}</option>
        </select>
      </jo-input>
      <jo-input label="等位时间" sm="6" md="4" after="min">
        <input v-model='data.waitTime' type="number" class="form-control">
      </jo-input>
      <jo-input label="提前预定时间" sm="6" md="4">
        <select v-model='data.aheadTime' class="form-control">
          <option v-for='ahead in aheadTimeOptions' :value='ahead.value'>{{ahead.text}}</option>
          <select>
      </jo-input>
      <jo-input sm="6" md="4" label="餐厅电话">
        <input v-model='data.phone' type="text" class="form-control">
      </jo-input>
      <jo-input sm="6" md="4" label="餐厅联系人">
        <input v-model='data.contactPerson' type="text" class="form-control">
      </jo-input>
    </div>
    <!-- row2开始 -->
    <div class="row">
      <jo-input sm="6" label="营业时间">
        <textarea v-model='data.openTime' class="form-control" rows="3"></textarea>
      </jo-input>
      <jo-input sm="6" label="餐厅备注">
        <textarea v-model='data.memo' class="form-control" rows="3"></textarea>
      </jo-input>
    </div>
    <!-- row3开始 -->
    <div class="row">
      <hr>
      <!-- divider -->
      <div class="col-xs-12 col-sm-4">
        <div class="radio">
          <label>
            <input v-model='data.restType' type="radio" value='1' name="rest-type"> 不等位
          </label>
        </div>
      </div>
      <jo-input sm="4" label="每天限制" after="单">
        <input v-model='data.maxOrder' type="number" min="0" class="form-control">
      </jo-input>
      <jo-input sm="4" label="每单限制" after="人">
        <input v-model='data.maxOrderPerson' type="number" min="0" class="form-control">
      </jo-input>
      <div class="col-xs-4 col-sm-4">
        <div class="radio">
          <label>
            <input v-model='data.restType' type="radio" value='2' name="rest-type"> 代排队
          </label>
        </div>
      </div>
      <!-- divider -->
      <jo-input sm="4" label="单人最多代排" after="人">
        <input v-model='data.maxWaitlist' type="number" min="0" class="form-control">
      </jo-input>
      <!-- divider -->
    </div>
    <!-- {{restInfoAdd|json}} -->
    <!-- row3结束 -->
    <div class="row">
      <jo-multi-imgs :imgs.sync='data.carouselUrl' :server='requestServer'></jo-multi-imgs>
    </div>
  </div>
</template>
<script>
import {
  cuisineIdOptions,
  aheadTimeOptions
} from './_restOptions'
import {
  districtOptions,
  hotAreaOptions
} from '../publicOptions'
import {
  joInput,
  joMultiImgs
} from 'jo'
const server = window.server

export default {
  props: ['data'],
  components: {
    joInput,
    joMultiImgs
  },
  data() {
    return {
      districtOptions,
      hotAreaOptions,
      cuisineIdOptions,
      aheadTimeOptions,
      requestServer: `${server}/qiniu/upload/0`
    }
  }
}
</script>
<style scoped>
.input-group {
  margin: 3px 0;
}
</style>
