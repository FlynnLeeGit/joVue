<template>
  <div>
    <div class="row" v-for="c in data.contents" v-if="+c.contentCategory===2">
      <!-- content内容 -->
      <button @click='delItem($index)' class="btn btn-danger btn-sm">删除此菜品介绍<i class="fa fa-arrow-down"></i></button>
      <div class="col-xs-12 row">
        <div class="col-xs-6">
          <jo-multi-str :str.sync='c.content' split-key='@' fields="菜品名称@菜品描述"></jo-multi-str>
        </div>
        <div class="col-xs-6">
          <jo-single-img :img.sync="c.imgUrl"></jo-single-img>
        </div>
      </div>
    </div>
    <button @click='addItem' class="btn btn-success btn-sm add-intro-btn ">
      <i class="fa fa-plus "></i> 添加菜品
    </button>
  </div>
</template>
<script>
import {
  joInput,
  joMultiStr,
  joSingleImg
} from 'jo'
const server = window.server
export default {
  props: ['data'],
  components: {
    joInput,
    joMultiStr,
    joSingleImg
  },
  methods: {
    addItem() {
      this.data.contents.push({
        contentCategory: 2
      })
    },
    delItem(index) {
      this.data.contents.splice(index, 1)
    },

  }
}
</script>
