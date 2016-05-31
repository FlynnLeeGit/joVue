<template>
  <a :class='btnCls'>
    <i class="material-icons left">{{icon}}</i>
    <slot></slot>
  </a>
</template>
<script>
import cx from 'classnames'
export default {
  name: 'md-btn',
  props: {
    icon: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'btn'
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  computed: {

    btnCls() {
      const sizeMap = {
        'md': '',
        'lg': 'btn-large'
      }
      return cx([this.theme, 'btn', 'waves-effect', 'waves-light', sizeMap[this.size]])
    }
  }
};
</script>
