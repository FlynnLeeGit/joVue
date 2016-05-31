<template>
  <div class="input-field col s12">
    <i class="material-icons prefix">{{icon}}</i>
    <input :id="key" :type="type" class="validate" v-model='model'>
    <label :for="key">{{label}}</label>
  </div>
</template>
<script>
export default {

  name: 'md-input',
  data() {
    return {
      key: -1
    }
  },
  props: {
    theme: {
      type: String,
      default: 's12'
    },
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'type Sth'
    },
    model: {
      twoWay: true
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    inputCls() {
      return ['input-field', 'col', this.theme]
    }
  },
  ready() {
    this.key = this._uid
  }
};
</script>
