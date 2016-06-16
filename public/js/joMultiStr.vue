<template>
  <div>
    <jo-input v-for='f in fieldsArr' xs='12' :label="f">
      <textarea v-model='strArr[$index]' type="text" class="form-control" :rows='rows'></textarea>
    </jo-input>
  </div>
</template>
<script>
import joInput from './joInput'
export default {
  props: {
    str: {
      required: true,
      twoWay: true
    },
    splitKey: {
      type: String,
      required: true
    },
    fields: {
      type: String,
      required: true
    },
    rows: {
      type: Number,
      default: 2
    }
  },
  components: {
    joInput
  },
  data() {
    return {
      strArr: [''],
      fieldsArr: ['']
    }
  },
  ready() {
    if (this.fields.indexOf(this.splitKey) > -1) {
      this.fieldsArr = this.fields.split(this.splitKey)
      if (!this.str) {
        this.strArr = this.fieldsArr.map(() => {
          return ''
        })
      } else {
        this.strArr = this.str.split(this.splitKey)
      }
    } else {
      this.fieldsArr.$set(0, this.fields)
    }
  },
  watch: {
    strArr(newArr) {
      this.str = newArr.join(this.splitKey)
    }
  }
}
</script>
