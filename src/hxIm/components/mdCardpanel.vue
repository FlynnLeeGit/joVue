<template>
  <div :class="panelCls">
    <div v-if='avator' class="row valign-wrapper">
      <div class="col s2">
        <img :src="avator" :alt="avator" class="circle resposive-img">
      </div>
      <div class="col s10">
        <slot></slot>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>
<script>
import cx from 'classnames'
export default {

  name: 'md-cardpanel',
  props: {
    theme: {
      type: String,
      default: 'white'
    },
    avator: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    };
  },
  computed: {
    panelCls() {
      return cx(['card-panel', this.theme])
    },
  }
};
</script>
