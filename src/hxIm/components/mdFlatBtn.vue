<template>
  <a :class='btnCls'>
    <i class="material-icons left">{{icon}}</i>
    <slot></slot>
  </a>
</template>
<script>
import cx from 'classnames'
export default {
  props: {
    theme: {
      type: String,
      default: 'teal'
    },
    icon: {
      type: String,
      default: ''
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
      return cx(['btn-flat', 'waves-effect', `waves-${this.theme}`, 'center-align', sizeMap[this.size]])
    }
  }

}
</script>
