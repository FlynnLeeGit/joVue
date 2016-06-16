<template>
  <div v-show='shouldRender'>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    header: {
      type: String,
      default: 'this is header',
      required: true
    },
  },
  created() {
    // 不存在这个标签时才push
    if (!this.$parent.tabsData.some(item => item.header === this.header)) {
      this.$parent.tabsData.push({
        header: this.header,
      })
    }
  },
  computed: {
    shouldRender() {
      if (this.$parent.tabsData) {
        return this.$parent.tabsData[this.$parent.selectedId].header === this.header
      }
    }

  }
}
</script>
