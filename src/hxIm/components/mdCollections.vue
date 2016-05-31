<template>
  <ul :class="collectionsCls">
    <slot></slot>
  </ul>
</template>
<script>
import cx from 'classnames'
export default {
  name: 'md-collection',
  prop: {
    theme: {
      type: String,
      default: ''
    }
  },
  computed: {
    collectionsCls() {
      return cx(['collection', this.theme])
    }
  }
};
</script>
