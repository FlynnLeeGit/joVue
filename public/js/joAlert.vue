<template>
  <div v-if='show' transition='expand' class="alert alert-{{theme}}">
    {{msg}}
    <i @click='show=false' class="close">&times;</i>
  </div>
</template>
<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'success'
    },
    msg: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      twoWay: true,
      default: false
    },
    closeTime: {
      type: Number,
      default: 2000
    }
  },
  watch: {
    show(val) {
      if (val) {
        setTimeout(() => {
          this.show = false
        }, this.closeTime)
      }
    }
  }
}
</script>
<style scoped>
.alert {
  position: fixed;
  z-index: 9999;
  left: 10%;
  top: 10%;
}

.expand-transition {
  transition: all .3s ease;
  opacity: 0.9;
  width: 80%;
}

.expand-enter,
.expand-leave {
  opacity: 0;
  width: 0;
}
</style>
