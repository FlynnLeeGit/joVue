<template>
  <div class="panel panel-{{theme}}">
    <slot name="header">
      <div class="panel-heading">
        {{title}}
      </div>
    </slot>
    <div class="panel-body">
      <slot name="body">
        this is ---> body
    </div>
  </div>
</template>
<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'primary'
    },
    title: {
      type: String,
    }
  }
}
</script>
