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
      return ''
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
