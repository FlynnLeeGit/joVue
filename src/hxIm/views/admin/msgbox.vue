<template>
  <div :class="wrapCls">
    <div class="grey-text">{{time}} {{mobile}}</div>
    <im-avator v-if='isLeft'></im-avator>
    <div :class="msgCls">
      <slot></slot>
    </div>
    <im-avator v-if='isRight'></im-avator>
  </div>
</template>
<script>
import cx from 'classnames'
import imAvator from '../../components/imAvator'
export default {
  name: 'text-msg',
  props: {
    side: {
      type: String,
      default: 'left'
    },
    time: {
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    }
  },
  components: {
    imAvator
  },
  data() {
    return {
      source: 'http://www.baidu.com/img/bd_logo1.png'
    };
  },
  computed: {
    isLeft() {
      return this.side === 'left'
    },
    isRight() {
      return this.side === 'right'
    },
    wrapCls() {
      return cx(['row', `${this.side}-align`])
    },
    msgCls() {
      return cx([this.isLeft ? 'white' : 'blue', 'msgbox', 'lighten-4', 'z-depth-2'])
    }
  }
};
</script>
<style>
.msgbox {
  text-align: left;
  max-width: 250px;
  padding: 10px;
  display: inline-block;
  border-radius: 5px;
  word-break: break-all;
}
</style>
