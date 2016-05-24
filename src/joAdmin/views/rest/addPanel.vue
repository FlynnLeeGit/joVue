<template>
  <div>
    <modal :show.sync='show' :large='true' effect='fade' :callback='confirmAdd' title='添加餐厅'>
      <div slot='modal-body' class="modal-body">
        <ul class="nav nav-tabs">
          <li v-for='tab in tabList' @click='selectedId=$index' :class="{active:selectedId===$index}"><a>{{tab.title}}</a></li>
        </ul>
        <component :data='addData' keep-alive :is="tabList[selectedId].page"></component>
      </div>
    </modal>
  </div>
</template>
<script>
import {
  tabList
} from './_restOptions'

import {
  v2RestService
} from 'api'
export default {
  props: ['show', 'refreshList'],
  components: {
    modal: require('jo').modal,
    restInfo: require('./_restInfo'),
    restSubshop: require('./_restSubshop'),
    restIntro: require('./_restIntro'),
    restMenu: require('./_restMenu'),
  },
  data() {
    return {
      tabList,
      selectedId: 0,
      addData: {
        contents: [],
        subshops: []
      }
    }
  },
  methods: {
    confirmAdd() {
      v2RestService.insertRest(this.addData)
        .then(res => this.updateList(res.msg))
    },
    updateList(msg) {
      this.show = false
      this.$root.$emit('showAlert', msg)
      this.refreshList++
    }
  }
}
</script>
<style>
.nav-tabs {
  &>li>a {
    cursor: pointer;
  }
}
</style>
