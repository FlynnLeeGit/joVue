<template>
  <div>
    <div class="row">
      <jo-input xs='12' label="一句话介绍">
        <input v-model='data.oneSentence' type="text" class="form-control">
      </jo-input>
      <jo-str :str.sync='data.waitReason' split-key=',' desc='等位理由'></jo-str>
    </div>
    <!-- 介绍 -->
    <h5>餐厅介绍 </h5>
    <div class="row col-xs-12" v-if="+c.contentCategory===1" v-for='c in data.contents' style="margin-top:10px">
      <button @click='delIntro($index)' class="btn btn-danger btn-sm">删除此餐厅介绍<i class="fa fa-arrow-down"></i></button>
      <div class="row">
        <div class="col-sm-6">
          <textarea v-model='c.content' class="form-control" rows="5"></textarea>
        </div>
        <div class="col-sm-6">
          <jo-single-img :img.sync='c.imgUrl'></jo-single-img>
        </div>
      </div>
    </div>
    <button @click='addIntro' class="btn btn-success btn-sm"><i class="fa fa-plus"></i> 添加餐厅介绍</button>
  </div>
</template>
<script>
import {
  joStr,
  joInput,
  joSingleImg
} from 'jo'
export default {
  props: ['data'],
  components: {
    joInput,
    joStr,
    joSingleImg
  },
  methods: {
    addIntro() {
      this.data.contents.push({
        contentCategory: 1
      })
    },
    delIntro(index) {
      this.data.contents.splice(index, 1)
    }
  }
}
</script>
