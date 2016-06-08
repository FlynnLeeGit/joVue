<template>
  <div>
    {{timeList|json}}
    <div class="row" v-for='t in timeList'>
      <div class="col-xs-2">
        <label class="pull-left timeset">
          <input v-model='t.checked' type="checkbox"> {{t.name}}
        </label>
      </div>
      <div v-show='t.checked' class="col-xs-10">
        <jo-input label='开始时间' sm='4'>
          <jo-datetime :no-date='true' :value.sync='t.start'></jo-datetime>
        </jo-input>
        <jo-input label='结束时间' sm='4'>
          <jo-datetime :no-date='true' :value.sync='t.end'></jo-datetime>
        </jo-input>
        <jo-input label='间隔' sm='4'>
          <select class="form-control" v-model='t.rap'>
            <option :value="15" selected>15分钟</option>
            <option :value="30">30分钟</option>
            <option :value="60">60分钟</option>
          </select>
        </jo-input>
        <jo-input label='提前' sm='4' after='天预定'>
          <input v-model='t.before' type="text" class="form-control">
        </jo-input>
        <jo-input sm='5' label='要在' after='点之前预定'>
          <jo-datetime :no-date='true' :value.sync='t.a'></jo-datetime>
        </jo-input>
      </div>
      <hr />
    </div>
  </div>
</template>
<script>
import {
  joInput,
  joDatetime
} from 'jo'
export default {

  name: 'rest_time',
  components: {
    joInput,
    joDatetime
  },
  data() {
    return {
      timeList: [{
        name: '午餐',
        checked: true,
      }, {
        name: '下午茶',
        checked: true,
      }, {
        name: '晚餐',
        checked: true

      }, {
        name: '夜场',
        checked: true
      }]
    };
  }
};
</script>
<style>
.timeset {
  margin-top: 10px;
  cursor: pointer;
}
</style>
