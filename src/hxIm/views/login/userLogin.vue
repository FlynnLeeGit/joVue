<template>
  <div :class="['card',$root.mainColor,'darken-1','z-depth-3']">
    <div class="card-content white-text">
      <span class="card-title">用户登陆</span>
      <div class="row">
        <md-input :model.sync='loginData.user' label='用户' icon='account_circle'></md-input>
        <md-input :model.sync='loginData.pwd' label='密码' type='password' icon='verified_user'></md-input>
      </div>
      <p class="red-text">{{$route.query.error}}</p>
    </div>
    <div class="card-action">
      <md-btn @click='login' theme="orange" icon='done_all'>提交</md-btn>
    </div>
  </div>
</template>
<script>
import mdInput from '../../components/mdInput'
import mdBtn from '../../components/mdBtn'
import {
  conn
} from '../../utils/easeim'
export default {
  name: 'userLogin',
  components: {
    mdBtn,
    mdInput
  },
  data() {
    return {
      loginData: {}
    }
  },
  methods: {
    login() {
      localStorage.setItem('token', JSON.stringify(this.loginData))
      this.$router.go({
        name: 'admin'
      })
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
