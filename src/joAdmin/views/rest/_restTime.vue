<template>
  <div>
    <!-- {{data|json}} -->
    <time-component :time-data.sync='t' v-for='t in data.timeList'>
      <p>&nbsp;
        <button @click='data.timeList.splice($index,1)' class="btn btn-danger">删除此时间段</button>________________</p>
    </time-component>
    <button @click='data.timeList.push({})' class="btn btn-success">添加市别</button>
  </div>
</template>
<script>
import timeComponent from './_restTimeComponent'

export default {
  name: 'rest_time',
  props: ['data'],
  components: {
    timeComponent
  },
};
</script>
<style>
.timeset {
  margin-top: 10px;
  cursor: pointer;
}
</style>
