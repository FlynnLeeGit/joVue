<template>
  <div>
    <div class="page-header">
      <h4>
    会员套餐服务优惠码
       <button @click='showAdd=true' class="btn btn-warning">新增优惠券</button>
    </h4>
    </div>
    <div v-if='showAdd'>
      <member-coup-panel :show.sync='showAdd' :data='editData'></member-coup-panel>
    </div>
    <jo-table v-if='!$loadingAsyncData' :data="memberCoupList" :option='memberTableOpts'></jo-table>
  </div>
</template>
<script>
import memberCoupPanel from './memberCoupPanel'
import {
  joAjax,
  joTable
} from 'jo'
import {
  memberTableOpts
} from './coupOpts'
export default {
  components: {
    memberCoupPanel,
    joTable
  },
  data() {
    return {
      memberTableOpts,
      showAdd: false,
      addData: {},
      editData: {},
      memberCoupList: []
    }
  },
  asyncData(resolve, reject) {
    joAjax.get('http://jo.cn/memberCoup')
      .then((result) => {
        resolve({
          memberCoupList: result.list
        })
      })
  },
  events: function(dom, index, obj) {
    if (/edit/.test(dom.classList)) {
      console.log('编辑')
    }
    if (/delete/.test(dom.classList)) {
      console.log('删除')
    }
  }
}
</script>
