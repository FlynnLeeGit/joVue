<template>
  <div class="checkbox">
    <label>
      <input type="checkbox" :value='value' v-model='model'> {{label}}
    </label>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: '复选框'
    },
    value: {
      type: String
    },
    model: {
      required: true
    }
  }
}
</script>
<style scoped>
.checkbox {
  margin-left: 1em;
  display: inline-block;
}
</style>
