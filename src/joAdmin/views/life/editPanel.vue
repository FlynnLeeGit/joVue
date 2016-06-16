<template>
  <modal :show.sync='show' effect='fade' :large='true' :callback='confirmEdit' title='编辑商家'>
    <div class="modal-body" slot='modal-body'>
      <jo-tabs>
        <jo-tab header='生活类型'>
          <life-type :data='editData'></life-type>
        </jo-tab>
        <jo-tab header='分店信息'>
          <life-subshop :data='editData'></life-subshop>
        </jo-tab>
        <jo-tab header='生活介绍'>
          <life-intro :data='editData'></life-intro>
        </jo-tab>
      </jo-tabs>
    </div>
  </modal>
</template>
<script>
import {
  tablist
} from './lifeOpts'
import {
  joTabs,
  joTab,
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
    joTab,
    lifeType,
    lifeSubshop,
    lifeIntro
  },
  data() {
    return {
      tablist,
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
