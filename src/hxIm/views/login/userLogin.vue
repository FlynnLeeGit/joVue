<template>
  <div :class="['card',$root.mainColor,'darken-1','z-depth-3']">
    <div class="card-content white-text">
      <span class="card-title">用户登陆</span>
      <div class="row">
        <md-input :model.sync='user' label='用户' icon='account_circle'></md-input>
        <md-input :model.sync='pwd' label='密码' type='password' icon='verified_user'></md-input>
      </div>
      <p class="red-text">{{errorMsg}}</p>
    </div>
    <div class="card-action">
      <md-btn @click='login' theme="orange" icon='done_all'>提交</md-btn>
    </div>
  </div>
</template>
<script>
import mdInput from '../../components/mdInput'
import mdBtn from '../../components/mdBtn'
export default {
  name: 'userLogin',
  components: {
    mdBtn,
    mdInput
  },
  data() {
    return {
      user: '',
      pwd: '',
      errorMsg: ''
    }
  },
  methods: {
    login() {
      this.$root.conn.open({
        user: this.user,
        pwd: this.pwd,
        appKey: 'easemob-demo#chatdemoui'
      })
    }
  },
  ready() {
    this.$root.conn.onOpened = () => {
      this.$router.go({
        name: 'admin',
        auth: true
      })
    }
    this.$root.conn.onError = e => {
      this.errorMsg = e.msg
    }

  }
};
</script>
<style scoped>
.card {
  width: 400px;
  position: absolute;
  left: 50%;
  margin-left: -200px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
