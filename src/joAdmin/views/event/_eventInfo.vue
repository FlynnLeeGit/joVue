<template>
  <div>
    <jo-input label="需要填写地址?" sm="6" md='4'>
      <select v-model='data.needAddress' class="form-control">
        <option value='1'>是</option>
        <option value='0'>否</option>
      </select>
    </jo-input>
    <jo-input label="场次类型?" sm="6" md='4'>
      <select v-model='data.type' class="form-control" :disabled='isEdit'>
        <option :value='0'>场次活动(使用场次标签)</option>
        <option :value='1'>长时间活动(用于票务 使用时间挂历)</option>
      </select>
    </jo-input>
    <jo-input label="活动关联服务" sm="6" md='4'>
      <select v-model='data.serId' class="form-control">
        <option v-for='s in serList' :value='s.serId'>{{s.serName}}</option>
      </select>
    </jo-input>
    <jo-input label="活动名称" sm='6' md='4'>
      <input v-model='data.name' type="text" class="form-control">
    </jo-input>
    <jo-input label="图片标签" sm='6' md='4'>
      <input v-model='data.imgLabel' type="text" class="form-control">
    </jo-input>
    <jo-input label="时间标签" sm='6' md='4'>
      <input v-model='data.timeLabel' type="text" class="form-control">
    </jo-input>
    <jo-input label="地点标签" sm='6' md='4'>
      <input v-model='data.addrLabel' type="text" class="form-control">
    </jo-input>
    <jo-input label="其他标签" sm='6' md='4'>
      <input v-model='data.otherLabel' type="text" class="form-control">
    </jo-input>
    <jo-input label="单位" sm='6' md='4'>
      <input v-model='data.unit' type="text" class="form-control">
    </jo-input>
    <jo-input label="一句话介绍" sm='12'>
      <input v-model='data.oneSentence' type="text" class="form-control">
    </jo-input>
    <div class="row">
      <div class="col-md-6">
        <h5>&nbsp;以下 注意标签填写</h5>
        <jo-str :str.sync='data.noticeLabel' split-key='@@' desc='注意标签'></jo-str>
      </div>
      <div class="col-md-6">
        <h5>以下 注意事项填写</h5>
        <jo-str desc='注意事项' split-key='@@' :str.sync='data.notice'></jo-str>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <jo-multi-str :str.sync='data.recommend' split-key='@@' fields='等位理由1@@等位理由2@@等位理由3' :rows='1'></jo-multi-str>
      </div>
      <jo-input label="预定成功信息" md='6'>
        <textarea class="form-control" v-model='data.successShow' cols="30" rows="3"></textarea>
      </jo-input>
    </div>
    <jo-input label="详情页H5 url地址" sm='12' md='8'>
      <input v-model='data.eventDetailUrl' type="text" class="form-control">
    </jo-input>
    <jo-multi-imgs :imgs.sync='data.carouselUrl' split-key='@@'></jo-multi-imgs>
  </div>
</template>
<script>
import {
  joInput,
  joLoading,
  joStr,
  joMultiImgs,
  joMultiStr
} from 'jo'
import {
  cardService
} from 'api'
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    mode: String
  },
  components: {
    joInput,
    joLoading,
    joStr,
    joMultiImgs,
    joMultiStr
  },
  data() {
    return {
      serList: [],
    }
  },
  computed: {
    isEdit() {
      return this.mode === 'edit'
    }
  },
  asyncData(resolve, reject) {
    cardService.getSerInfos()
      .then(serList => resolve({
        serList
      }))
  },
}
</script>
<style scoped>
.row {
  border-bottom: 1px dotted #999;
}
</style>
