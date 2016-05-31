<template>
  <div>
    <div class="page-header">
      <h4>活动优惠券(服务)<button class="btn btn-warning" @click='showAdd=true'><i class="fa fa-plus"></i>&nbsp;添加优惠券</button></h4>
    </div>
    <coup-panel v-if='showAdd' :show.sync='showAdd' mode='add'></coup-panel>
    <coup-panel v-if='showEdit' :show.sync='showEdit' mode='edit'></coup-panel>
    <!-- {{datalist|json}} -->
    <jo-table v-if='!$loadingAsyncData' :data="datalist" :option="couponTableOpts"></jo-table>
    {{couponTableOpts|json}}
  </div>
</template>
<script>
import {
  joTable,
  joFetch
} from 'jo'
import {
  couponTableOpts
} from './couponOpts'


export default {
  components: {
    joTable,

  },
  data() {
    return {
      couponTableOpts,
      showAdd: false,
      showEdit: false,
      datalist: []
    }
  },
  asyncData(resolve, reject) {

  }
}
</script>
