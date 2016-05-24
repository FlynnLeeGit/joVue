<template>
  <div>
    <p class="text-center">
      <button @click='data.subshops.push({})' class="btn btn-primary">添加分店</button>
    </p>
    <div class="row" v-for='sub in data.subshops'>
      <h4 class="text-center">
      分店{{$index+1}} &nbsp; 
        <button @click='data.subshops.splice($index,1)'  class="btn btn-danger btn-xs">
           删除此分店
        </button>
      </h4>
      <jo-input sm='4' label="分店名称">
        <input v-model='sub.subName' class="form-control" type="text">
      </jo-input>
      <jo-input sm="4" label="商家地区">
        <select v-model='sub.sdistrict' class="form-control">
          <option v-for='o in districtOptions'>{{o}}</option>
        </select>
      </jo-input>
      <jo-input sm="4" label="商家商圈">
        <select v-model='sub.shotArea' class="form-control">
          <option v-for='o in hotAreaOptions'>{{o}}</option>
        </select>
      </jo-input>
      <jo-input sm="6" label="商家地址">
        <input v-model='sub.saddress' class="form-control" type="text">
      </jo-input>
      <jo-input sm="3" label="联系人">
        <input v-model='sub.scontactPerson' class="form-control" type="text">
      </jo-input>
      <jo-input sm="3" label="电话">
        <input v-model='sub.sphone' class="form-control" type="number">
      </jo-input>
      <jo-input sm="6" label="营业时间">
        <textarea v-model='sub.sopenTime' class="form-control" rows="3"></textarea>
      </jo-input>
    </div>
  </div>
</template>
<script>
import {
  joInput
} from 'jo'
import {
  hotAreaOptions,
  districtOptions
} from '../publicOptions'
export default {
  props: ['data'],
  components: {
    joInput
  },
  data() {
    return {
      hotAreaOptions,
      districtOptions
    }
  }
}
</script>
