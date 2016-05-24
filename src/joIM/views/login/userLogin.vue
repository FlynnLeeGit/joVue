<template>
  <div>
    <test :opts='opts'></test>
  </div>
</template>
<script>
import test from './test'
export default {
  components: {
    test,
  },
  data() {
    return {
      opts: {}
    }
  },
  ready() {
    setTimeout(() => {
      this.opts = {
        field: '123',
        filter: 'currency'
      }
    }, 500)
  }

}
</script>
