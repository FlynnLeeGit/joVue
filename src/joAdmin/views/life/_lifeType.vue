<template>
  <div>
    <div class="row">
      <jo-input sm="4" label="商家名称">
        <input v-model='data.lifeName' class="form-control" type="text">
      </jo-input>
      <jo-input sm="4" label="商家地区">
        <select v-model='data.district' class="form-control">
          <option v-for='o in districtOptions'>{{o}}</option>
        </select>
      </jo-input>
      <jo-input sm="4" label="商家商圈">
        <select v-model='data.hotArea' class="form-control">
          <option v-for='o in hotAreaOptions'>{{o}}</option>
        </select>
      </jo-input>
      <jo-input sm="6" label="人均价格">
        <input v-model='data.avgPrice' type="number" class="form-control">
      </jo-input>
      <jo-input sm="6" label="商家类型">
        <input v-model='data.lifeType' type="text" class="form-control">
      </jo-input>
      <jo-input xs='12' label="商家地址">
        <input v-model='data.address' type="text" class="form-control">
      </jo-input>
      <jo-input sm="6" label="商家电话">
        <input v-model='data.phone' type="number" class="form-control">
      </jo-input>
      <jo-input sm="6" label="商家联系人">
        <input v-model='data.contactPerson' type="text" class="form-control">
      </jo-input>
      <jo-input sm="6" label="营业时间">
        <textarea v-model='data.openTime' class="form-control" rows="3"></textarea>
      </jo-input>
      <jo-input sm="6" label="商家备注">
        <textarea v-model='data.memo' class="form-control" rows="3"></textarea>
      </jo-input>
      <div class="col-xs-12">
        <jo-multi-imgs :multiple='true' :imgs.sync='data.carouselUrl'></jo-multi-imgs>
      </div>
    </div>
  </div>
</template>
<script>
import {
  joInput,
  joMultiImgs
} from 'jo'
import {
  hotAreaOptions,
  districtOptions
} from '../publicOptions'
const server = window.server
export default {
  props: ['data'],
  components: {
    joInput,
    joMultiImgs
  },
  data() {
    return {
      hotAreaOptions,
      districtOptions
    }
  }
}
</script>
<style>
</style>
