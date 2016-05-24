<template>
  <modal :show.sync="show" :small='true' :callback='addCard'>
    <div class="modal-header" slot="modal-header">
      <h4>选择服务 <jo-loading :loading='$loadingAsyncData'></jo-loading></h4> {{selectedIndex}}
    </div>
    <div class="modal-body row" slot="modal-body">
      <jo-input label="请选择服务" sm="12">
        <select v-model='selectedIndex' class="form-control">
          <option :value='$index' v-for='s in serList'>{{s.serName}}</option>
        </select>
      </jo-input>
    </div>
  </modal>
</template>
<script>
import {
  joInput,
  joLoading,
  modal
} from 'jo'
import {
  cardService
} from 'api'
export default {
  props: ['show'],
  components: {
    joInput,
    modal,
    joLoading
  },
  data() {
    return {
      serList: [],
      selectedIndex: 0
    }
  },
  methods: {
    addCard() {
      this.show = false
      this.$dispatch('addCard', this.serList[this.selectedIndex])
    }
  },
  asyncData(resolve, reject) {
    cardService.getSerInfos()
      .then(serList => resolve({
        serList
      }))
  }
}
</script>
