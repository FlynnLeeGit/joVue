<template>
  <div>
    <div class="page-header">
      <h4>意见反馈 <jo-loading :loading='$loadingAsyncData'></jo-loading></h4>
    </div>
    <!-- {{adviceList|json}} -->
    <div>
      <jo-table :data='adviceList' :option='tableAdviceOpts'></jo-table>
    </div>
  </div>
</template>
<script>
import {
  joInput,
  joTable,
  joLoading
} from 'jo'
import {
  accountService
} from 'api'
import {
  tableAdviceOpts
} from './userOpts'

export default {
  components: {
    joInput,
    joTable,
    joLoading
  },
  data() {
    return {
      tableAdviceOpts,
      adviceList: []
    }
  },
  asyncData(resolve, reject) {
    accountService.getFeedbacks().then(adviceList => resolve({
      adviceList
    }))
  }
}
</script>
