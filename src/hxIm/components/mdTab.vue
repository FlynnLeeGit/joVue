<template>
  <div class="col s12" :id='uid'>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'md-tab',
  props: {
    header: {
      type: String,
      default: 'header'
    },
  },
  created() {
    // 传递到父组件的renderData数组中
    this.$parent.renderData.push({
      header: this.header, //传入标题名称
      uhref: '#' + this.uid // 传入唯一id 这是vue实例的属性
    })
  },
  computed: {
    uid() {
      return `tab${this._uid}`
    }
  }
};
</script>
