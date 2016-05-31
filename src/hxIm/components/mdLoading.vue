<template>
  <div :class="sizeCls" v-show='isLoading'>
    <div :class="themeCls">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="gap-patch">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'md-loading',
  props: {
    size: {
      type: String,
      default: 'md'
    },
    theme: {
      type: String,
      default: 'blue'
    },
    isLoading: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    themeCls() {
      return ['spinner-layer', `spinner-${this.theme}-only`]
    },
    sizeCls() {
      let sizeMap = {
        lg: 'big',
        md: '',
        sm: 'small'
      }
      return ['preloader-wrapper', sizeMap[this.size], 'active']
    },
  }
};
</script>
