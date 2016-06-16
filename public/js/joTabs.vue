<template>
  <div>
    <ul class="nav nav-tabs">
      <li @click='selectedId=$index' :class="{active:selectedId===$index}" v-for='t in tabsData'><a href="javascript:;">{{t.header}}</a></li>
    </ul>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {

  },
  data() {
    return {
      tabsData: [],
      selectedId: 0,
    }
  },
}
</script>
