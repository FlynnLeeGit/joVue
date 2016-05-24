<template>
  <input @focus='showlist=true' v-model='keyword' type="text" class="form-control">
  <span @click="resetKeyword" class="input-group-addon reset">
   <span v-if='loading'>
    <i  class="fa fa-spinner fa-spin"></i>
      {{loadingText}} 
    </span>
  <span v-if='!loading'>
      &times;
    </span>
  </span>
  <div @click='showlist=false' v-if='showlist && keyword' class="list-group">
    <a @click='setKeyword(listItem)' href='javascript:;' class="list-group-item" v-for='listItem in list | filterBy keyword'>{{listItem}}</a>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      required: true
    },
    loading: {
      required: true
    },
    loadingText: {
      type: String,
      default: '加载中...'
    },
    keyword: {
      type: String,
      required: true,
      twoWay: true
    }
  },
  data() {
    return {
      showlist: false
    }
  },
  methods: {
    setKeyword(listItem) {
      this.keyword = listItem
    },
    resetKeyword() {
      this.keyword = ''
    }
  }
}
</script>
<style lang='sass' scoped>
.list-group {
  position: absolute;
  z-index: 999;
  right: 0;
  top: 40px;
  .list-group-item {
    font-size: 12px;
    padding: 5px;
  }
}

.reset {
  cursor: pointer;
}
</style>
