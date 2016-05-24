<template>
  <modal :show.sync='show' title='前台排序管理(请拖曳排序)' :callback='confirmOrder' :large='true'>
    <div class="modal-body row " slot='modal-body'>
      <div class="col-xs-12">
        <ul class="list-group">
          <li @dragstart='dragstart($index,$event)' @dragover='endIndex = $index' @drop.prevent='drop' @dragover.prevent :class="dragClass($index)" draggable='true' v-for="d in orderedData">
            <span>{{$index}}--{{d.restName}}</span>
          </li>
        </ul>
      </div>
    </div>
  </modal>
</template>
<script>
import {
  v2RestService
} from 'api'

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
    modal: require('jo').modal
  },
  data() {
    return {
      startIndex: -1,
      endIndex: -1,
      orderedData: this.data.slice().sort((a, b) => {
        return a.orderBy - b.orderBy
      })
    }
  },
  methods: {
    dragClass($index) {
      return {
        'list-group-item': true,
        'col-sm-4': true,
        'active': this.startIndex === $index,
        'activeEnd': this.endIndex === $index
      }
    },
    swapItem(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0]
    },
    drop() {
      this.swapItem(this.orderedData, this.startIndex, this.endIndex)
      this.startIndex = -1
    },
    dragstart($index, e) {
      this.startIndex = $index
    },
    confirmOrder() {
      let sendQuery = this.orderedData.map(({
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
}
</script>
<style scoped>
li {
  cursor: pointer;
  transition: all .5s;
}

.activeEnd {
  background-color: #999;
  color: #fff;
}
</style>
