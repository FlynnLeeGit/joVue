<template>
  <modal :show.sync='show' effect='fade' :large='true' :callback='confirmAdd' title='添加商家'>
    <div class="modal-body" slot='modal-body'>
      <jo-tabs :tablist='tablist' :selected-id.sync='selectedId'></jo-tabs>
      <component keep-alive :data.sync='addData' :is='tablist[selectedId].page'></component>
    </div>
  </modal>
</template>
<script>
import {
  joTabs,
  modal
} from 'jo'

import lifeIntro from './_lifeIntro'
import lifeSubshop from './_lifeSubshop'
import lifeType from './_lifeType'
import {
  tablist
} from './lifeOpts'
import {
  lifeService
} from 'api'
export default {
  props: ['show', 'reload'],
  components: {
    modal,
    joTabs,
    lifeIntro,
    lifeSubshop,
    lifeType
  },
  data() {
    return {
      tablist,
      addData: {
        subshops: [],
        contents: []
      },
      selectedId: 0
    }
  },
  methods: {
    confirmAdd() {
      lifeService.insertLife(this.addData)
        .then(res => this.updateList(res.msg))
    },
    updateList(msg) {
      this.show = false
      this.reload += 1
      this.$root.$emit('showAlert', msg)
    },
    resetAdd() {
      this.$set('addData', {
        subshops: [],
        contents: []
      })
    }
  }
}
</script>
