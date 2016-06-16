<template>
  <jo-input :label="m._memberLevel+' ('+m._memberMoney+'元)'" v-for='m in memberPriceData' sm='6'>
    <input v-model='m.price' type="number" class="form-control">
  </jo-input>
</template>
<script>
import {
  vipService
} from 'api'
import {
  joInput
} from 'jo'
export default {
  props: {
    memberPriceData: {
      type: Array,
      required: true
    },
  },
  components: {
    joInput
  }
}
</script>
