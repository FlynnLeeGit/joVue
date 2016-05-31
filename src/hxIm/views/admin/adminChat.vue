<template>
  <!-- 聊天用户列表 -->
  <div v-el:chatlist class="chat-list">
    <md-tabs theme='teal'>
      <md-tab header='进行中'>
        <md-collections>
          <md-collection icon='add' v-for='m in mockList' :title='m.mobile'>
            <p slot='primary' class="grey-text">{{m.msg}}</p>
            <p slot='secondary'>{{m.loginTime}}</p>
          </md-collection>
        </md-collections>
      </md-tab>
      <md-tab header='客服同事'>
        <md-collections>
          <md-collection icon='add' v-for='m in mockList' title='123'>
            <p slot='primary' class="grey-text">{{m.msg}}</p>
            <p slot='secondary'>{{m.loginTime}}</p>
          </md-collection>
        </md-collections>
      </md-tab>
    </md-tabs>
  </div>
  <!-- 聊天信息部分-->
  <div class="chat-area">
    <div v-el:msglist class="msg-list">
      <msgbox v-for='o in mockList'>
        {{o.msg}}
      </msgbox>
    </div>
    <div class="input-box card">
      <div @click.stop class="card emoji-panel" v-show='showEmoji'>
        emojo
      </div>
      <a @click.stop='toggleEmoji' class="btn-floating teal waves-effect waves-light">
        <i class="material-icons">face</i>
      </a>
      <div class="file-field input-field">
        <div class="btn-floating green waves-effect waves-light">
          <i class="material-icons">image</i>
          <input type="file" accept="image/*">
        </div>
      </div>
      <div class="file-field input-field">
        <div class="btn-floating indigo waves-effect waves-light">
          <i class="material-icons">insert_link</i>
          <input type="file">
        </div>
      </div>
      <md-btn icon='send' theme='right'>发送</md-btn>
      <textarea @keyup.enter='sendMsg' v-model='msg' class="materialize-textarea"></textarea>
    </div>
  </div>
</template>
<script>
import mdCollections from '../../components/mdCollections'
import mdCollection from '../../components/mdCollection'
import mdIcon from '../../components/mdIcon'
import mdTabs from '../../components/mdTabs'
import mdTab from '../../components/mdTab'
import mdCardpanel from '../../components/mdCardpanel'
import mdFlatBtn from '../../components/mdFlatBtn'
import mdBtn from '../../components/mdBtn'
import msgbox from './msgbox'
export default {
  name: 'chat-window',
  components: {
    mdCollection,
    mdCollections,
    mdIcon,
    mdTabs,
    mdTab,
    mdCardpanel,
    mdFlatBtn,
    mdBtn,
    msgbox
  },
  data() {
    return {
      showEmoji: false,
      msg: '',
      mockList: [{
        mobile: '181222222',
        loginTime: '5-14',
        msg: 'hello'
      }, {
        mobile: '181222222',
        loginTime: '5-14',
        msg: 'hello'
      }, {
        mobile: '181222222',
        loginTime: '5-14',
        msg: 'hello'
      }, {
        mobile: '181222222',
        loginTime: '5-14',
        msg: 'hello'
      }, {
        mobile: '181222222',
        loginTime: '5-14',
        msg: 'hello'
      }, {
        mobile: '181222222',
        loginTime: '5-14',
        msg: 'hello'
      }, {
        mobile: '181222222',
        loginTime: '5-14',
        msg: 'hello'
      }]
    };
  },
  methods: {
    sendMsg() {

      if (this.msg) this.mockList.push({
        mobile: '11',
        loginTime: '111',
        msg: this.msg
      })

      this.msg = ''

      this.initListScroll()

    },
    initListScroll() {
      this.$nextTick(() => {
        this.$els.msglist.scrollTop = 99999
      })
    },
    toggleEmoji() {
      this.showEmoji = true;
      document.onclick = () => {
        log('close')
        this.showEmoji = false
      }
    }
  },
  ready() {
    this.initListScroll()
  }

};
</script>
<style lang='sass'>
.chat-list {
  flex: 0 0 220px;
  overflow-y: auto;
}

.chat-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  .msg-list {
    flex: 1;
    padding: 5px;
    overflow-y: auto;
  }
  .emoji-panel {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 10px;
    top: -210px;
    z-index: 999;
  }
  .input-box {
    flex: 0 0 100px;
    position: relative;
    .file-field {
      display: inline;
    }
    .materialize-textarea {
      margin: 0 auto;
      width: 90%;
      padding: 0;
      transform: translateX(2%);
    }
  }
}
</style>
