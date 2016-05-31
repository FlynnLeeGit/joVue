<template>
  <div>
    <jo-input v-if='strArr' track-by='$index' v-for="r in strArr" :label="desc+($index+1)" xs="12">
      <input v-model='r' class="form-control" type="text">
      <span slot='after' class="input-group-addon">
      <button @click='strArr.splice($index,1)' class="btn btn-xs btn-danger">删除此{{desc}}</button>
      </span>
    </jo-input>
    <div class="col-xs-12">
      <button class="btn btn-success btn-sm" @click="strArr.push('')"><i class="fa fa-plus"></i>添加{{desc}}</button>
    </div>
  </div>
</template>
<script>
import joInput from './joInput'
import joSplit from './utils/joSplit'
export default {
  props: {
    str: {
      required: true,
      twoWay: true
    },
    splitKey: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },

  },
  components: {
    joInput
  },
  data() {
    return {
      strArr: []
    }
  },
  ready() {
    this.strArr = joSplit(this.str, this.splitKey)
  },
  watch: {
    str(newStr) {
      this.strArr = joSplit(newStr, this.splitKey)
    },
    strArr(newStrArr) {
      this.str = newStrArr.join(this.splitKey)
    }
  }
}
</script>
