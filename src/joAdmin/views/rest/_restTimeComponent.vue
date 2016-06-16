<template>
  <div class="row">
    <slot></slot>
    <jo-input label='请选择时间段' sm='4'>
      <select class="form-control" v-model='timeData.mealTime'>
        <option>午餐</option>
        <option>下午茶</option>
        <option>晚餐</option>
        <option>夜场</option>
      </select>
    </jo-input>
    <jo-input label='开始时间' sm='4'>
      <jo-datetime :no-date='true' :value.sync='timeData._start'></jo-datetime>
    </jo-input>
    <jo-input label='结束时间' sm='4'>
      <jo-datetime :no-date='true' :value.sync='timeData._end'></jo-datetime>
    </jo-input>
    <jo-input label='间隔' sm='4'>
      <select class="form-control" v-model='timeData._gap'>
        <option :value="0.25">15分钟</option>
        <option :value="0.5" selected>30分钟</option>
        <option :value="1">60分钟</option>
      </select>
    </jo-input>
    <jo-input label='提前' sm='3' after='天预定'>
      <input v-model='timeData.aheadDate' type="text" class="form-control">
    </jo-input>
    <jo-input sm='5' label='要在' after='点之前预定'>
      <jo-datetime :no-date='true' :value.sync='timeData.aheahTime'></jo-datetime>
    </jo-input>
  </div>
</template>
<script>
import {
  joInput,
  joDatetime
} from 'jo'
export default {
  name: 'component_name',
  props: {
    timeData: {
      type: Object,
      twoWay: true
    }
  },
  components: {
    joInput,
    joDatetime
  },
  methods: {
    zerotime(number) {
      return number < 10 ? '0' + number : number
    }
  },
  computed: {
    showTime() {
      let {
        _start,
        _end,
        _gap
      } = this.timeData
      if (_start && _end && _gap) {
        let start = parseInt(_start.split(':')[0]) + parseInt(_start.split(':')[1]) / 60
        let end = parseInt(_end.split(':')[0]) + parseInt(_end.split(':')[1]) / 60


        let timeArr = []
        for (let i = start; i <= end; i += _gap) {
          let h = parseInt(i)
          let m = (i - parseInt(i)) * 60

          timeArr.push(`${this.zerotime(h)}:${this.zerotime(m)}`)
        }
        return timeArr
      } else {
        return []
      }
    }
  },
  watch: {
    'showTime' (newTimeArr) {
      this.$set('timeData.showTime', newTimeArr)
    }
  }
};
</script>
<style lang="css" scoped>
</style>
