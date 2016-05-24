<template>
  <div>
    <ul class="nav nav-tabs">
      <li @click='selectedId=$index' v-for="tab in tablist" :class="{'active':$index===selectedId}"><a href="javascript:;">{{tab.title}}</a></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['tablist', 'selectedId']
}
</script>
