<template>
  <div class="radio">
    <label>
      <input type="radio" v-model='model' :name='name' :value='value'> {{label}}
    </label>
  </div>
</template>
<script>
export default {
  props: ['label', 'name', 'model', 'value']
}
</script>
