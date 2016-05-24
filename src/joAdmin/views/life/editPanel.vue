<template>
  <modal :show.sync='show' effect='fade' :large='true' :callback='confirmEdit' title='编辑商家'>
    <div class="modal-body" slot='modal-body'>
      <jo-tabs :tablist='tablist' :selected-id.sync='selectedId'></jo-tabs>
      <component keep-alive :data.sync='editData' :is='tablist[selectedId].page'></component>
    </div>
  </modal>
</template>
<script>
import {
  tablist
} from './lifeOpts'
import {
  joTabs,
  modal
} from 'jo'
import {
  lifeService
} from 'api'
import lifeType from './_lifeType'
import lifeSubshop from './_lifeSubshop'
import lifeIntro from './_lifeIntro'
const server = window.server
export default {
  props: {
    show: {
      type: Boolean,
      twoWay: true,
    },
    reload: {
      type: Number,
      twoWay: true
    },
    lifeId: {
      type: String
    }
  },
  components: {
    modal,
    joTabs,
    lifeType,
    lifeSubshop,
    lifeIntro
  },
  data() {
    return {
      tablist,
      selectedId: 0,
      editData: {}
    }
  },
  methods: {
    confirmEdit() {
      lifeService.updateLife(this.editData)
        .then(res => this.updateList(res.msg))
    },
    updateList(msg) {
      this.show = false
      this.$root.$emit('showAlert', msg)
      this.reload++
    }
  },
  asyncData(resolve, reject) {
    lifeService.getOneLife(this.lifeId)
      .then(editData => resolve({
        editData
      }))
  }
}
</script>
