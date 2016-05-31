<template>
  <accordion>
    <panel v-for='side in sideList' :header='side.header' :is-open='true'>
      <ul class="nav nav-pills nav-stacked">
        <li v-link="{name:sub.path,activeClass:'active'}" v-for='sub in side.subPage' }>
          <a href='javascript:;'>
            <i class="fa {{sub.icon}}"></i>
            <span>{{sub.title}}</span>
          </a>
        </li>
      </ul>
    </panel>
  </accordion>
</template>
<script>
import {
  panel,
  accordion
} from 'vue-strap'
import sideList from './sideList'
export default {
  components: {
    accordion,
    panel
  },
  data() {
    return {
      sideList,
    }
  }
}
</script>
