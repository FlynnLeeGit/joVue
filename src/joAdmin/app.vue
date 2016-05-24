<template>
  <div>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" v-link="{path:'OrderList'}">JO <sup>+</sup>后台管理系统 2.2</a>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <jo-dropdown label='请选择主题'>
            <li @click='themeIndex=-1'><a>默认主题</a></li>
            <li @click='themeIndex=$index' :class="{'active':themeIndex===$index}" v-for='t in themeList'><a>{{t.theme}}</a></li>
          </jo-dropdown>
        </ul>
      </div>
    </nav>
    <!-- 侧边栏 -->
    <div class="col-xs-12 col-sm-3 col-lg-2">
      <side-bar></side-bar>
    </div>
    <!-- 内容区 -->
    <div class="col-xs-12 col-sm-9 col-lg-10">
      <audio v-el:notify>
        <source :src='notifyMp3' type="audio/mpeg">
        <source :src='notifyOgg' type='audio/ogg'>
      </audio>
      <router-view transition='fade' transition-mode='out-in'></router-view>
    </div>
    <jo-alert :msg='alertObj.msg' :show.sync='alertObj.show'></jo-alert>
  </div>
</template>
<script>
import {
  joOpenWin,
  joDropdown,
  joAlert
} from 'jo'
const wsServer = window.wsServer
import SideBar from './views/SideBar'
export default {
  components: {
    SideBar,
    joDropdown,
    joAlert
  },
  data() {
    return {
      alertObj: {
        msg: '',
        show: false,
      },
      nitifyMp3: require('./assets/notify.mp3'),
      notifyOgg: require('./assets/notify.ogg'),
      themeIndex: -2,
      themeList: [{
        theme: 'cerulean'
      }, {
        theme: 'cosmo'
      }, {
        theme: 'cyborg'
      }, {
        theme: 'darkly'
      }, {
        theme: 'flatly'
      }, {
        theme: 'journal'
      }, {
        theme: 'lumen'
      }, {
        theme: 'paper'
      }, {
        theme: 'readable'
      }, {
        theme: 'sandstone'
      }, {
        theme: 'simplex'
      }, {
        theme: 'slate'
      }, {
        theme: 'spacelab'
      }, {
        theme: 'united'
      }]
    }
  },
  methods: {
    playAudio() {
      this.$els.notify.load()
      this.$els.notify.play()
    },
  },
  watch: {
    themeIndex(newIndex) {
      window.localStorage.setItem('themeIndex', newIndex)
      if (newIndex === -1) {
        document.getElementsByTagName('link')[0].href = 'http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.min.css'
      } else {
        document.getElementsByTagName('link')[0].href = `http://cdn.bootcss.com/bootswatch/3.3.6/${this.themeList[newIndex].theme}/bootstrap.min.css`
      }
    }
  },
  ready() {
    this.$on('showAlert', (msg, theme = 'success') => {
      this.alertObj = {
        show: true,
        msg,
        theme,
      }
    })

    // 获得主题索引
    this.themeIndex = +window.localStorage.getItem('themeIndex') || -1
      // 建立websocket连接
    const ws = new window.WebSocket(wsServer)
    ws.onopen = () => {
      console.log('ws连接成功!')
      ws.onmessage = (e) => {
        console.log(e.data)
        let {
          orderId,
          restName,
          bookerName,
          bookerPhone,
          eatDate,
          isVip,
          orderStatus
        } = JSON.parse(e.data)
        isVip ? isVip = '是' : isVip = '否'
        if (+orderStatus === 100001) orderStatus = '等待支付'
        if (+orderStatus === 100002) orderStatus = '已支付'
        if (+orderStatus === 100003) orderStatus = '已完成'
        if (+orderStatus === 100004) orderStatus = '已取消'
        if (+orderStatus === 100005) orderStatus = '已失效'
        if (+orderStatus === 100006) orderStatus = '已退款'
        joOpenWin('http://www.joplus.cn/popup', {
          width: 400,
          height: 200,
          right: 0,
          bottom: 100,
          msg: `<h3>有新订单啦 ${orderId}</h3><p>姓名:${bookerName} 店家:${restName} 预约手机:${bookerPhone} 是否会员:${isVip} 订单状态:${orderStatus}</p>`,
          closeAfter: 10000
        })
        this.playAudio()
      }
      ws.onclose = () => {
        console.log('ws closed')
      }
    }
  }
}
</script>
<style>
.page-header {
  margin: 0 0 10px 0;
  padding: 0;
}
</style>
