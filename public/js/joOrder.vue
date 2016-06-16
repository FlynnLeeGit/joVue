<template>
  <div class="col-xs-12">
    <!-- {{orderedData|json}} -->
    <ul class="list-group">
      <li @dragstart='dragstart($index,$event)' @dragover='endIndex = $index' @drop.prevent='drop' @dragover.prevent :class="dragClass($index)" draggable='true' v-for="d in orderedData">
        <span>{{$index}}--{{d[showField]}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    showField: {
      type: String,
      required: true
    },
    orderField: {
      type: String,
      default: 'orderBy'
    }
  },
  data() {
    return {
      startIndex: -1,
      endIndex: -1,
      orderedData: this.data.slice().sort((a, b) => {
        return a[this.orderField] - b[this.orderField]
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
      this.data = this.orderedData
    },
    dragstart($index) {
      this.startIndex = $index
    },
  }
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
