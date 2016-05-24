<template>
  <span :class="[loading?'text-warning':'text-success']">
        {{loading?'Loading...':'Completed'}}
        <i v-if='loading' class="fa fa-spin fa-spinner"></i>
   </span>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>
<style scoped>
.loading-btn {
  border: none;
}
</style>
