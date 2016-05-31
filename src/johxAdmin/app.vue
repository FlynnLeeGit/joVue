<template>
  <div class="container">
    <ul class="nav nav-tabs">
      <li :style='navStyle' v-for='nav in navlist' v-link="{name:nav.path,activeClass:'active'}"><a>{{nav.title}}</a></li>
    </ul>
    <div>
      <jo-alert :show.sync='alertObj.show' :msg='alertObj.msg'></jo-alert>
      <router-view transition='fade' transition-mode='out-in'></router-view>
    </div>
  </div>
</template>
<script>
import {
  joAlert
} from 'jo'

export default {
  components: {
    joAlert
  },
  data() {
    return {
      navlist: [{
        path: 'UserInfo',
        title: '用户信息'
      }, {
        path: 'CardInfo',
        title: '卡片信息'
      }],
      navStyle: {
        width: '50%',
        textAlign: 'center'
      },
      alertObj: {
        msg: '',
        show: false
      }
    }
  },

  ready() {
    console.log(this.$route)
    this.$on('showAlert', msg => {
      this.alertObj = {
        show: true,
        msg
      }
    })
  }
}
</script>
<style>
body {
  padding-top: 50px;
}

.page-header {
  margin: 10px 0;
}

.nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: #fff;
}
</style>
