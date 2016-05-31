<template>
  <div class='col s12'>
    <ul class="tabs">
      <li class="tab col" v-for='t in renderData'><a :class='tabCls' :href="t.uhref">{{t.header}}</a></li>
    </ul>
    <!-- 此部分slot是内容区 -->
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'md-tabs',
  props: {
    theme: {
      type: String,
      default: 'pink'
    }
  },
  data() {
    return {
      renderData: []
    }
  },
  computed: {
    tabCls() {
      return [`${this.theme}-text`]
    }
  },
  ready() {
    window.$(document).ready(() => {
      $('.tabs .indicator').css({
        background: this.theme
      })
    })
  }
};
</script>
