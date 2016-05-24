<template>
  <div>
    <jo-input xs='12' label="一句话介绍">
      <input v-model='data.oneSentence' class="form-control" type="text">
    </jo-input>
    <div class="row">
      <!-- 字符串分割拼接组件 -->
      <jo-str :str.sync="data.waitReason" split-key=',' desc='推荐理由'></jo-str>
    </div>
    <div class="row" v-for='intro in data.contents'>
      <div class="col-sm-6">
        <h4>
         <span>详情介绍{{$index+1}} &nbsp;</span> 
         <button class="btn btn-danger btn-sm" @click="data.contents.splice($index,1)">删除此详情介绍组</button>
       </h4>
        <jo-input xs="12" label='标题'>
          <input v-model='intro.title' class="form-control" type="text">
        </jo-input>
        <jo-input xs="12" label='文字'>
          <textarea v-model='intro.content' class="form-control" rows="5"></textarea>
        </jo-input>
      </div>
      <div class="col-sm-6">
        <jo-single-img :img.sync="intro.imgUrl" :server='requestServer'></jo-single-img>
      </div>
    </div>
    <button class="btn btn-success btn-sm" @click="data.contents.push({})"><i class="fa fa-plus"></i>添加详情介绍组</button>
  </div>
</template>
<script>
import {
  joInput,
  joSingleImg,
  joStr
} from 'jo'
const server = window.server
export default {
  props: ['data'],
  components: {
    joInput,
    joSingleImg,
    joStr,
  },
  data() {
    return {
      requestServer: `${server}/qiniu/upload/0`
    }
  }
}
</script>
