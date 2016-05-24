<template>
  <button @click.stop='showDrop=!showDrop' class="btn btn-lg btn-warning">
    <span>{{label}}</span>
    <span class="caret"></span>
  </button>
  <ul :class="['dropdown-menu',showDrop?'active':'']">
    <slot></slot>
  </ul>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showDrop: false
    }
  },
  ready() {
    const closeLayer = () => {
      this.showDrop = false
    }
    document.addEventListener('click', closeLayer, false)
  }
}
</script>
<style scoped>
.btn {
  position: relative;
}

.dropdown-menu.active {
  display: block;
}
</style>
