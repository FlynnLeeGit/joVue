<template>
  <modal :show.sync='show' effect='fade' :large='true' :callback='confirmAdd' title='添加商家'>
    <div class="modal-body" slot='modal-body'>
      <jo-tabs :data.sync='addData'>
        <jo-tab header='生活类型'>
          <life-type :data='addData'></life-type>
        </jo-tab>
        <jo-tab header='分店信息'>
          <life-subshop :data='addData'></life-subshop>
        </jo-tab>
        <jo-tab header='生活介绍'>
          <life-intro :data='addData'></life-intro>
        </jo-tab>
      </jo-tabs>
    </div>
  </modal>
</template>
<script>
import {
  modal,
  joTabs,
  joTab,
} from 'jo'

import lifeIntro from './_lifeIntro'
import lifeSubshop from './_lifeSubshop'
import lifeType from './_lifeType'

import {
  lifeService
} from 'api'
export default {
  props: ['show', 'reload'],
  components: {
    modal,
    lifeIntro,
    lifeSubshop,
    lifeType,
    joTabs,
    joTab
  },
  data() {
    return {
      addData: {
        subshops: [],
        contents: []
      },
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
