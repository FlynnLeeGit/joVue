<template>
  <modal :show.sync='show' title='详情面板' :callback='confirm'>
    <div class="modal-body row" slot='modal-body'>
      this is modal {{id}}
    </div>
  </modal>
</template>
<script>
import {
  modal
} from 'jo'
export default {
  components: {
    modal
  },
  props: {
    show: Boolean,
    id: String,
  },
  methods: {
    confirm() {
      log(this.id)
      log('confirm')
    }
  }
}
</script>
