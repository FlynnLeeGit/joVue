<template>
  <modal :show.sync='show' title='前台排序管理(请拖曳排序)' :callback='confirm' :large='true'>
    <div class="modal-body row " slot='modal-body'>
      <jo-order :data.sync='data' show-field='restName' order-field='orderBy'></jo-order>
    </div>
  </modal>
</template>
<script>
import {
  v2RestService
} from 'api'
import {
  joOrder
} from 'jo'

export default {
  props: {
    show: {
      type: Boolean,
      twoWay: true
    },
    data: {
      default: []
    }
  },
  components: {
    modal: require('jo').modal,
    joOrder,
  },
  methods: {
    confirm() {
      let sendQuery = this.data.map(({
        restId
      }, index) => ({
        restId,
        orderBy: index
      }))
      v2RestService.orderRest(sendQuery)
        .then(res => this.updateList('排序成功'))
    },
    updateList(msg) {
      this.$root.$emit('showAlert', msg)
      this.show = false
      this.$parent.refreshList += 1
    }
  },
  watch: {
    data(newData) {
      log('data变化')
    }
  }
}
</script>
