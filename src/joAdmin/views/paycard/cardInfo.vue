<template>
  <jo-input :label="info.key">
    <input v-if="isText && !isRest" v-model='info.value' class="form-control" type="text">
    <jo-datetime v-if="isTime" :value.sync='info.value'></jo-datetime>
    <input v-if="isNumber" type="number" v-model='info.value' class="form-control">
    <jo-search loading-text='加载餐厅中...' :loading='$loadingAsyncData' v-if="isRest" :list='restList' :keyword.sync='info.value'></jo-search>
    <span v-if='isTemplate' class="input-group-addon" slot='after'>
        <button @click='toggleTime' :class="['btn','btn-xs',isTime?'btn-info':'btn-default']">时间?</button>
        <button @click='toggleNumber' :class="['btn','btn-xs',isNumber?'btn-info':'btn-default']">数字?</button>
    </span>
  </jo-input>
</template>
<script>
import {
  joInput,
  joSearch,
  joDatetime,
} from 'jo'
import {
  restService
} from 'api'
export default {
  props: ['info', 'mode'],
  data() {
    return {
      restList: [],
    }
  },
  components: {
    joInput,
    joSearch,
    joDatetime,
  },
  computed: {
    isTemplate() {
      return this.mode === 'template'
    },
    isTime() {
      return this.info.type === 'datetime-local'
    },
    isNumber() {
      return this.info.type === 'number'
    },
    isText() {
      return !this.info.type
    },
    isRest() {
      return this.info.key === '餐厅'
    }
  },
  methods: {
    toggleTime() {
      this.info = this.isTime ? Object.assign({}, this.info, {
        type: ''
      }) : Object.assign({}, this.info, {
        type: 'datetime-local'
      })
    },
    toggleNumber() {
      this.info = this.isNumber ? Object.assign({}, this.info, {
        type: ''
      }) : Object.assign({}, this.info, {
        type: 'number'
      })
    }
  },
  asyncData(resolve, reject) {
    if (this.isRest) restService.getRests().then(restList => resolve({
      restList
    }))
  }
}
</script>
