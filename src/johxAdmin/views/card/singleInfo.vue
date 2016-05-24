<template>
  <jo-input :label="info.key" xs='12'>
    <input v-if='isNumber' type="number" class="form-control" v-model='info.value'>
    <input v-if='isText && !isRest' type="text" class="form-control" v-model='info.value'>
    <jo-datetime v-if='isTime' :value.sync="info.value"></jo-datetime>
    <jo-search :loading='$loadingAsyncData' :list='restList' v-if='isRest' :keyword.sync='info.value'></jo-search>
  </jo-input>
</template>
<script>
import {
  joInput,
  joDatetime,
  joSearch,
} from 'jo'
import {
  restService
} from 'api'
export default {
  props: {
    info: Object,
    required: true
  },
  data() {
    return {
      restList: []
    }
  },
  components: {
    joInput,
    joDatetime,
    joSearch
  },
  computed: {
    isRest() {
      return this.info.key === '餐厅'
    },
    isTime() {
      return this.info.type === 'datetime-local'
    },
    isNumber() {
      return this.info.type === 'number'
    },
    isText() {
      return !this.info.type
    }
  },
  asyncData(resolve, reject) {
    if (this.isRest) {
      restService.getRests().then(restList => resolve({
        restList
      }))
    }
  },
  ready() {
    this.$on('test', msg => console.log(msg))
  }
}
</script>
