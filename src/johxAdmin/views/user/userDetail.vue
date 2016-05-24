<template>
  <modal :show.sync='show' title='用户详细信息'>
    <div class="modal-body row" slot='modal-body'>
      <jo-input label="生日" xs="12">
        <input type="text" class="form-control" :value='userData.birthday |datetime' readonly>
      </jo-input>
      <jo-input :label="'地址'+($index+1)" xs="12" v-for='a in userData.addressEntities'>
        <input type="text" class="form-control" :value="a.province+a.city+a.area+a.address" readonly>
      </jo-input>
      <jo-input label="邮箱" xs="12">
        <input type="text" class="form-control" :value='userData.email' readonly>
      </jo-input>
      <jo-input label="兴趣爱好" xs="12">
        <input type="text" class="form-control" :value='userData.intrest' readonly>
      </jo-input>
    </div>
  </modal>
</template>
<script>
import {
  modal,
  joInput
} from 'jo'
export default {
  props: {
    show: {
      twoWay: true,
      type: Boolean
    },
    userData: {
      type: Object
    }
  },
  components: {
    modal,
    joInput
  }
}
</script>
