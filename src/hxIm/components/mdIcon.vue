<template>
  <i :class='iconCls'>
  <slot></slot> 
 </i>
</template>
<script>
import cx from 'classnames'
export default {
  name: 'md-icon',
  props: {
    size: {
      type: String,
      default: 'sm'
    },
    theme: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconCls() {
      let sizeMap = {
        lg: 'large',
        md: 'medium',
        sm: 'small',
        xs: 'tiny',
      }
      return cx(['material-icons', sizeMap[this.size]], this.theme)
    }
  }
};
</script>
