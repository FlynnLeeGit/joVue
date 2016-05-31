<template>
  <img class="circle z-depth-2 im-avator" :src="imgUrl" :alt="source">
</template>
<script>
export default {

  name: 'im-avator',
  props: {
    source: {
      type: String,
      default: '',
    }

  },
  computed: {
    imgUrl() {
      return this.source ? this.source : 'http://kefu.easemob.com/images/uikit/default_agent.png'
    }
  }
};
</script>
<style lang="css" scoped>
.im-avator {
  width: 48px;
  height: 48px;
  vertical-align: top;
}
</style>
