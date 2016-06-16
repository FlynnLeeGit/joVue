<template>
  <div>
    <span class="text-info">{{ticketData.labelContent}}</span>
    <input type="number" class="form-control input-sm" v-model='ticketData.stockNum' :disabled="ticketData.stockStatus==='0'">
  </div>
</template>
<script>
export default {

  props: {
    ticketData: Object,
    callback: {
      type: Function,
      default () {}
    }
  },
  watch: {
    'ticketData.stockNum' (newNum) {
      this.callback(Object.assign(this.ticketData, {
        stockNum: newNum
      }))
    },
    'ticketData.stockStatus' (newStatus) {
      this.callback(Object.assign(this.ticketData, {
        stockStatus: newStatus
      }))
    }
  }
}
</script>
