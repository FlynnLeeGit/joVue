<template>
  <div>
    <div class="page-header">
      <div class="row">
        <div class="col-sm-3">
          <h4>
          邀请码
          <button @click='showModal=true' class="btn btn-primary">新增邀请码</button>
        </h4>
        </div>
        <jo-input sm='6' label='搜索'>
          <input type="text" class="form-control">
        </jo-input>
      </div>
    </div>
    <div>
    </div>
    <modal :small='true' :show.sync='showModal' effect='fade'>
      <div class="modal-header" slot='modal-heaer'>
        <h4>邀请码</h4>
      </div>
      <div class="modal-body" slot='modal-body'>
        <jo-input label="邀请码">
          <input type="text" class="form-control">
        </jo-input>
        <jo-input label="会员">
          <input id="member" type="radio">
          <label for="member">2000元/年</label>
        </jo-input>
        <jo-input label="有效期">
          <input type="text" class="form-control">
        </jo-input>
        <jo-input label="供应商">
          <input type="text" class="form-control">
        </jo-input>
      </div>
      <div class="modal-footer" slot='modal-footer'>
        <button class="btn btn-primary">生成链接</button>
      </div>
    </modal>
  </div>
</template>
<script>
import {
  joTable,
  joInput
} from 'jo'
import {
  modal
} from 'vue-strap'
export default {
  components: {
    joTable,
    joInput,
    modal
  },
  data() {
    return {
      showModal: false,
      couponList: []
    }
  }
}
</script>
