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
      return cx(['material-icons', sizeMap[this.size]])
    }
  }
};
</script>
