<template>
  <div>
    <p>
      <button @click='addSubshop' class="btn btn-info">
        <i class="fa fa-plus"></i> 添加分店
      </button>
    </p>
    <div class="row" v-for='sub in data.subshops'>
      <h5 class="text-center">
      分店{{$index+1}}
       <button @click='delSubshop($index)' class="btn btn-danger">删除</button>
      </h5>
      <jo-input sm="6" md="4" label="分店名称">
        <input type="text" class="form-control" v-model='sub.subName'>
      </jo-input>
      <jo-input sm="6" md="4" label="餐厅地区">
        <select class="form-control" v-model='sub.sdistrict'>
          <option v-for='d in districtOptions'>{{d}}</option>
        </select>
      </jo-input>
      <jo-input sm="6" md="4" label="餐厅商圈">
        <select class="form-control" v-model='sub.shotArea'>
          <option v-for='h in hotAreaOptions'>{{h}}</option>
        </select>
      </jo-input>
      <jo-input sm="8" md="8" label="餐厅地址">
        <input type="text" class="form-control" v-model='sub.saddress'>
      </jo-input>
      <jo-input sm="6" md="4" label="餐厅电话">
        <input type="number" class="form-control" v-model='sub.sphone'>
      </jo-input>
      <jo-input sm="6" md="4" label="餐厅联系人">
        <input type="text" class="form-control" v-model='sub.scontactPerson'>
      </jo-input>
      <!-- divider -->
      <div class="col-xs-12 col-sm-6 openTime">
        <label>营业时间</label>
        <textarea class="form-control" rows="3" v-model='sub.sopenTime'></textarea>
      </div>
      <!-- divider -->
    </div>
  </div>
</template>
<script>
import {
  hotAreaOptions,
  districtOptions
} from '../publicOptions'

export default {
  components: {
    joInput: require('jo').joInput
  },
  props: ['data'],
  data() {
    return {
      hotAreaOptions,
      districtOptions
    }
  },
  methods: {
    addSubshop() {
      this.data.subshops.push({})
    },
    delSubshop(index) {
      this.data.subshops.splice(index, 1)
    }
  }
}
</script>
<style>
.input-group {
  margin: 3px 0;
}

.openTime {
  clear: both;
}
</style>
