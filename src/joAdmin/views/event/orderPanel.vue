<template>
  <modal :show.sync='show' title='活动列表(拖曳排序)' :callback='confirm'>
    <div class="modal-body row" slot='modal-body'>
      <jo-order :data.sync='data' show-field='name'></jo-order>
    </div>
  </modal>
</template>
<script>
import {
  modal,
  joOrder
} from 'jo'
export default {
  components: {
    modal,
    joOrder
  },
  props: {
    show: Boolean,
    data: Array,
  },
  methods: {
    confirm() {
      let sendQuery = this.data.map(({
        eventId
      }, index) => {
        return {
          eventId,
          orderBy: index
        }
      })
      console.table(sendQuery)
    }
  }
}
</script>
