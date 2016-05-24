<template>
  <div :class="colArr">
    <div class="input-group">
      <span class="input-group-addon">
          <span v-if='label'>{{label}}</span>
      <slot name='label'></slot>
      </span>
      <slot></slot>
      <span v-if='after' class="input-group-addon">{{after}}</span>
      <slot name='after'></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ['label', 'after', 'xs', 'sm', 'md', 'lg'],
  computed: {
    xsNum() {
      return this.xs ? `col-xs-${this.xs}`.trim() : ''
    },
    smNum() {
      return this.sm ? `col-sm-${this.sm}`.trim() : ''
    },
    mdNum() {
      return this.md ? `col-md-${this.md}`.trim() : ''
    },
    lgNum() {
      return this.lg ? `col-lg-${this.lg}`.trim() : ''
    },
    colArr() {
      return [this.xsNum, this.smNum, this.mdNum, this.lgNum]
    }
  }
}
</script>
