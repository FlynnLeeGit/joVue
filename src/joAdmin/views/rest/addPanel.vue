<template>
  <div>
    <modal :show.sync='show' :large='true' effect='fade' :callback='confirmAdd' title='添加餐厅'>
      <div slot='modal-body' class="modal-body">
        <jo-tabs>
          <!-- {{addData|json}}
 -->
          <jo-tab header='餐厅信息'>
            <rest-info :data='addData'></rest-info>
          </jo-tab>
          <jo-tab header='分店信息'>
            <rest-subshop :data='addData'></rest-subshop>
          </jo-tab>
          <jo-tab header='餐厅介绍'>
            <rest-intro :data='addData'></rest-intro>
          </jo-tab>
          <jo-tab header='推荐菜'>
            <rest-menu :data='addData'></rest-menu>
          </jo-tab>
          <jo-tab header='时间设置'>
            <rest-time :data='addData'></rest-time>
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
  props: ['show', 'refreshList'],
  components: {
    modal: require('jo').modal,
    joTabs: require('jo').joTabs,
    joTab: require('jo').joTab,
    restInfo: require('./_restInfo'),
    restSubshop: require('./_restSubshop'),
    restIntro: require('./_restIntro'),
    restMenu: require('./_restMenu'),
    restTime: require('./_restTime')
  },
  data() {
    return {
      addData: {
        contents: [],
        subshops: [],
        timeList: []
      }
    }
  },
  methods: {
    confirmAdd() {
      let sendObj = Object.assign({}, this.addData, {
        timeList: JSON.stringify(this.addData.timeList)
      })
      v2RestService.insertRest(sendObj)
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
