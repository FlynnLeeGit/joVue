<template>
  <div v-el:chatlist class="chat-list">
    <md-tabs theme='teal'>
      <md-tab header='进行中'>
        <md-collections>
          <md-collection :active="nowRoster.from===m.from" @click='changeRoster(m)' icon='assignment_ind' v-for='m in chatList' :title='m.from'>
            <p slot='primary' class="grey-text">{{m.payload| typeMsg}}</p>
            <p slot='secondary'>{{m.created_time | time}}
              <br /><span v-show='m.unreadNum' class="new badge">{{m.unreadNum}}</span>
            </p>
          </md-collection>
        </md-collections>
      </md-tab>
      <md-tab header='客服同事'>
        <md-collections>
          <md-collection icon='add' v-for='a in agentList' :title='a.user'>
            <p slot='primary' class="grey-text">{{a.online?'在线':'下线中'}}
            </p>
            <p slot='secondary'>
            </p>
          </md-collection>
        </md-collections>
      </md-tab>
    </md-tabs>
  </div>
  <!-- 模态窗 -->
  <div id="modal1" class="modal">
    <div class="modal-content">
      <h4>客服列表 请选择</h4>
      <md-btn v-show='agent.user!==nowAgent.user && agent.online' @click='changeAgent(agent)' v-for='agent in agentList' theme='indigo modal-action modal-close' icon='perm_identity'>{{agent.user}}</md-btn>
    </div>
  </div>
  <!-- 模态窗结束 -->
  <!-- 聊天信息部分-->
  <div class="chat-area">
    <div class="row">
      <div v-if='nowAgent' class="col s4">
        <label>最大接待</label>
        <select @change='updateMaxCallin($event)' class="browser-default">
          <option v-for='n in 20' :value='n+1' :selected='nowAgent.maxCallin===n+1'>{{n+1}}人</option>
        </select>
      </div>
      <div v-show='nowRoster.from' class="col s4">
        <label>转接客服</label>
        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">转接</a>
      </div>
      <div v-if='nowAgent' class="col s4">
        <label>是否上线</label>
        <a @click='toggleOnline' :class="['waves-effect','waves-light','btn',nowAgent.online?'indigo':'grey']">{{nowAgent.online?'ON':'OFF'}}</a>
      </div>
    </div>
    <div v-el:msglist class="msg-list">
      <msgbox v-for="m in msgList |orderBy 'modified_time'" :side="m.from===nowRoster.from?'left':'right'" :mobile="m.from" :time='m.modified_time |datetime'>
        <span :title='m | json'>{{{m.payload |typeMsg |emojiReg}}}</span>
      </msgbox>
    </div>
    <div v-show='nowRoster.from' class="input-box card">
      <!-- 表情输入面板 -->
      <div @click.stop class="card emoji-panel" v-if='showEmoji' keep-alive>
        <span v-for='(eKey,eName) in emojiList'>
            <img @click='addEmoji(eKey)' class="emoji" :src="eName | emojiUrl">
        </span>
      </div>
      <!-- 表情发送按钮 -->
      <a @click.stop='toggleEmoji' class="btn-floating teal waves-effect waves-light">
        <i class="material-icons">face</i>
      </a>
      <!-- 图片发送按钮 -->
      <div class="file-field input-field">
        <div class="btn-floating green waves-effect waves-light">
          <i class="material-icons">image</i>
          <input id="img" @change='sendImg' type="file" accept="image/*">
        </div>
      </div>
      <!-- 文件发送按钮 -->
      <div class="file-field input-field">
        <div class="btn-floating indigo waves-effect waves-light">
          <i class="material-icons">mic</i>
          <input id="audio" @change='sendAudio' type="file" accept='audio/mp3'>
        </div>
      </div>
      <md-btn @click='sendMsg' icon='send' theme='right'>发送</md-btn>
      <!-- 输入框 -->
      <textarea v-el:inputmsg @keyup.enter='sendMsg' v-model='msg' class="materialize-textarea" placeholder="请输入文字" autofocus></textarea>
    </div>
  </div>
  <iframe class="iframe" :src='iframeSrc' frameborder="0"></iframe>
  <audio v-el:notify :src="notifyAudio">不支持的音频格式</audio>
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
import {
  conn
} from '../../utils/easeim'
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
      nowRoster: {},
      nowAgent: {},
      mapObj: {},
      msgList: [],
      agentList: [],
      msg: '',
      showEmoji: false,
      user: JSON.parse(localStorage.getItem('token')).user
    };
  },
  computed: {
    mapHash() {
      return this.mapObj.mapHash
    },
    chatList() {
      let tmpObj = {}
      let M = this.mapHash
      for (let i in M) {
        if (M[i].to === this.user) {
          tmpObj[i] = M[i]
        }
      }
      return tmpObj
    },
    nowAgent() {
      return this.agentList.filter(agent => agent.user === this.user)[0]
    }
  },
  methods: {
    toggleOnline() {
      agentStore.update({
        id: this.nowAgent.id,
        online: !this.nowAgent.online
      })
    },
    sendMsg() {
      conn.sendTextMessage({
        to: this.nowRoster.from,
        msg: this.msg,
      })
      this.handleInsertMsg({
        type: 'txt',
        msg: this.msg
      })
      this.msg = ''
    },
    sendImg() {


    },
    sendAudio() {


    },
    handleInsertMsg(payload) {
      msgStore.store({
        modified_time: new Date().getTime(),
        from: this.user,
        to: this.nowRoster.from,
        unread: false,
        payload,
      })
    },
    changeAgent(newAgent) {
      let newMapObj = Object.assign({}, this.mapObj)
      newMapObj.mapHash[this.nowRoster.from].to = newAgent.user
      mapStore.update(newMapObj)

      let newAgentObj = Object.assign({}, this.nowAgent)
      newAgentObj.currentRoster = 0
      agentStore.update(newAgentObj)

      this.msgList = []
      this.nowRoster = {}
    },
    updateMaxCallin(e) {
      agentStore.update({
        id: this.nowAgent.id,
        maxCallin: +e.target.value
      })
    },
    changeRoster(r) {
      this.nowRoster = r

      let newMapObj = Object.assign({}, this.mapObj)
      newMapObj.mapHash[r.from].unreadNum = 0
      mapStore.update(newMapObj)

      let newAgentObj = Object.assign({}, this.nowAgent)
      newAgentObj.currentRoster = r.from
      agentStore.update(newAgentObj)


      this.getMsgList()

    },
    getMsgList(from) {
      window.msgStore.findAll({
        from: this.nowRoster.from
      }, {
        to: this.nowRoster.from
      }).fetch().subscribe(msgArr => {
        this.msgList = msgArr
        this.initListScroll()
        let tmpArr = []
        msgArr.forEach(msg => {
          if (msg.unread) {
            msg.unread = false
            tmpArr.push(msg)
          }
        })
        msgStore.update(tmpArr)
      })
    },
    initListScroll() {
      this.$nextTick(() => {
        if (this.$els.msglist) {
          this.$els.msglist.scrollTop = 99999
        }
      })
    },
    toggleEmoji() {
      this.showEmoji = true;
      document.onclick = () => {
        this.showEmoji = false
      }
    },
    addEmoji(eKey) {
      this.msg += eKey
      this.$els.inputmsg.focus()
    },
  },
  ready() {
    this.emojiList = Easemob.im.Helper.EmotionPicData

    $(document).ready(function() {
      $('select').material_select();
      $('.modal-trigger').leanModal();
    });



    window.mapStore.watch().subscribe(mapArr => {
      this.mapObj = mapArr[0]
      log('新消息进入')
    })

    window.msgStore.watch().subscribe(msgArr => {
      if (this.nowRoster.from) this.getMsgList()
    })

    window.agentStore.watch().subscribe(agentArr => {
      this.agentList = agentArr
      log('客服列表更新')
    })

  }
};
</script>
<style lang='sass'>
.chat-list {
  flex: 0 0 280px;
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
    opacity: 0.8;
    width: 250px;
    position: absolute;
    left: 0;
    top: -200px;
    z-index: 999;
    .emoji {
      cursor: pointer;
    }
  }
  .input-box {
    flex: 0 0 120px;
    position: relative;
    .file-field {
      display: inline;
    }
    .materialize-textarea {
      margin: 0 auto;
      width: 90%;
      padding: 0.8rem 0;
      transform: translateX(2%);
    }
  }
}

.iframe {
  flex: 0 0 280px;
}
</style>
