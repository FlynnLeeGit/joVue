<template>
  <div v-el:chatlist class="chat-list">
    <md-tabs theme='teal'>
      <md-tab header='进行中'>
        <md-collections>
          <md-collection :active="nowRoster.from===m.from" @click='changeRoster(m)' icon='assignment_ind' v-for='m in chatList' :title='m.from'>
            <p slot='primary' class="grey-text">{{m.msg}}</p>
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
      <md-btn v-show='agent.user!==nowAgent.user' @click='changeAgent(agent)' v-for='agent in agentList' theme='indigo modal-action modal-close' icon='perm_identity'>{{agent.user}}</md-btn>
    </div>
  </div>
  <!-- 模态窗结束 -->
  <!-- 聊天信息部分-->
  <div class="chat-area">
    <div class="row">
      <div class="col s6">
        <label>最大接待人数</label>
        <select @change='updateMaxCallin($event)' class="browser-default">
          <option v-for='n in 20' :value='n+1' :selected='nowAgent.maxCallin==n+1'>{{n+1}}人</option>
        </select>
      </div>
      <div v-show='nowRoster.from' class="col s6">
        <label>转接客服</label>
        <a class="waves-effect waves-light btn modal-trigger" href="#modal1">转接</a>
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
      /** [horizon变量] */
      agentList: [],
      allMsgList: [],
      nowAgent: {},
      msgList: [],
      mapHash: {},
      mapId: null,
      /** [本地变量] */
      showEmoji: false,
      emojoList: {},
      msg: '',
      nowRoster: {},
      notifyAudio: require('../../static/msg.mp3'),
      user: JSON.parse(localStorage.getItem('token')).user
    };
  },
  computed: {
    iframeSrc() {
      return `http://crm.joplus.cn/im/?visitorImId=${this.nowRoster.from}`
    },
    chatList() {
      let tmpArr = []
      log(sf(this.mapHash))
      for (let i in this.mapHash) {
        if (this.mapHash[i] === this.user) tmpArr.push({
          from: i
        })
      }
      return tmpArr
    }

  },
  methods: {
    changeAgent(agent) {
      log(sf(agent))
      mapStore.update({
        id: this.mapId,
        mapHash: Object.assign(this.mapHash, {
          [this.nowRoster.from]: agent.user
        })
      })
    },
    convertMsg(payload) {
      switch (payload.type) {
        case 'txt':
          return payload.msg
        case 'img':
          return '[图片信息]'
        case 'audio':
          return '[音频信息]'
        default:
          return ''
      }
    },
    updateMaxCallin(e) {
      agentStore.update({
        id: this.nowAgent.id,
        maxCallin: e.target.value,
      })
    },
    changeRoster(m) {
      this.nowRoster = m
        // 修改当前客户接待人
      agentStore.update({
        id: this.nowAgent.id,
        currentRoster: m.from
      })
      msgStore.findAll({
        from: m.from
      }, {
        to: m.from
      }).fetch().subscribe(msgArr => {
        this.msgList = msgArr
          // 更新未读状态
        msgArr.forEach((m) => {
          msgStore.update({
            id: m.id,
            unread: false
          })
        })
      })
      this.initListScroll()
    },
    handleInsertMsg(payload) {
      msgStore.store({
        from: this.user,
        to: this.nowRoster.from,
        modified_time: new Date().getTime(),
        agent: this.user,
        payload,
      })
    },
    sendMsg() {
      if (this.msg) {
        conn.sendTextMessage({
          to: this.nowRoster.from,
          msg: this.msg,
        })
        this.handleInsertMsg({
          type: 'txt',
          msg: this.msg
        })

        this.msg = ''
        this.initListScroll()
      }
    },
    initListScroll() {
      this.$nextTick(() => {
        this.$els.msglist.scrollTop = 99999
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
    sendImg() {
      let imgFileList = document.getElementById('img').files
      let imgObj = Easemob.im.Helper.getFileUrl('img')
      conn.sendPicture({
        fileInputId: 'img',
        to: this.nowRoster.from,
        onFileUploadError: e => {
          log(e)
        },
        onFileUploadComplete: data => {
          log(data)
          this.handleInsertMsg({
            type: 'img',
            url: `${data.uri}/${data.entities[0].uuid}`
          })
          this.initListScroll()
        }
      })
    },
    sendAudio() {
      let audioObj = Easemob.im.Helper.getFileUrl('audio')
      log(audioObj)
      conn.sendAudio({
        fileInputId: 'audio',
        to: this.nowRoster.from,
        onFileUploadComplete: data => {

          this.initListScroll()
        },
        onFileUploadError: e => {
          log(e)
        }
      })
    },
  },

  ready() {

    this.initListScroll()

    this.emojiList = Easemob.im.Helper.EmotionPicData

    $(document).ready(function() {
      $('select').material_select();
      $('.modal-trigger').leanModal();
    });

    // 通知api
    window.Notification.requestPermission((per) => {
      if (per !== 'granted') window.alert('您还未启用通知功能!')
    })


    /**[horizon初始化] */

    window.agentStore.watch().subscribe(arr => {
      log('客服列表更新', arr)
      this.agentList = arr
    })

    window.agentStore.find({
        user: this.user
      }).watch().subscribe(nowAgent => {
        this.nowAgent = nowAgent
      })
      /**[初始信息获取]*/

    window.mapStore.watch().subscribe(mapArr => {
      log('映射表更新')
      this.mapHash = mapArr[0].mapHash
      this.mapId = mapArr[0].id
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
