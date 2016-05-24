<template>
  <div>
    <modal :show.sync='show' :large='true' effect='zoom' :callback='confirmEdit' title='编辑餐厅'>
      <div slot='modal-body' class="modal-body">
        <ul class="nav nav-tabs">
          <li v-for='tab in tabList' @click='selectedId=$index' :class="{active:selectedId===$index}"><a>{{tab.title}}</a></li>
        </ul>
        <component :data='editData' keep-alive :is="tabList[selectedId].page"></component>
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
  props: ['show', 'id', 'refreshList'],
  components: {
    modal: require('jo').modal,
    restInfo: require('./_restInfo'),
    restSubshop: require('./_restSubshop'),
    restIntro: require('./_restIntro'),
    restMenu: require('./_restMenu')
  },
  data() {
    return {
      tabList,
      selectedId: 0,
      editData: {}
    }
  },
  methods: {
    confirmEdit() {
      v2RestService.updateRest(this.editData)
        .then(res => {
          this.show = false
          this.$root.$emit('showAlert', res.msg)
          this.refreshList++
        })
    }
  },
  asyncData(resolve, reject) {
    v2RestService.getOneRest(this.id)
      .then(editData => resolve({
        editData
      }))
  }
}
</script>
