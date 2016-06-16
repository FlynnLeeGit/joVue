<template>
  <div>
    <modal :show.sync='show' :large='true' effect='zoom' :callback='confirmEdit' title='编辑餐厅'>
      <div slot='modal-body' class="modal-body">
        <jo-tabs>
          <jo-tab header='餐厅信息'>
            <rest-info :data='editData'></rest-info>
          </jo-tab>
          <jo-tab header='分店信息'>
            <rest-subshop :data='editData'></rest-subshop>
          </jo-tab>
          <jo-tab header='餐厅介绍'>
            <rest-intro :data='editData'></rest-intro>
          </jo-tab>
          <jo-tab header='推荐菜'>
            <rest-menu :data='editData'></rest-menu>
          </jo-tab>
          <jo-tab header='时间设置'>
            <rest-time :data='editData'></rest-time>
          </jo-tab>
        </jo-tabs>
      </div>
    </modal>
  </div>
</template>
<script>
import {
  v2RestService
} from 'api'
export default {
  props: ['show', 'id', 'refreshList'],
  components: {
    modal: require('jo').modal,
    joTabs: require('jo').joTabs,
    joTab: require('jo').joTab,
    restInfo: require('./_restInfo'),
    restSubshop: require('./_restSubshop'),
    restIntro: require('./_restIntro'),
    restMenu: require('./_restMenu'),
    restTime: require('./_restTime'),
  },
  data() {
    return {
      editData: {}
    }
  },
  methods: {
    confirmEdit() {
      let sendObj = Object.assign({}, this.editData, {
        timeList: JSON.stringify(this.editData.timeList)
      })
      v2RestService.updateRest(sendObj)
        .then(res => {
          this.show = false
          this.$root.$emit('showAlert', res.msg)
          this.refreshList++
        })
    }
  },
  asyncData(resolve, reject) {
    v2RestService.getOneRest(this.id)
      .then(editData => {
        editData.timeList = JSON.parse(editData.timeList) || []
        resolve({
          editData
        })
      })
  }
}
</script>
