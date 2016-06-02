<template>
  <!-- 聊天用户列表 -->
  <div v-el:chatlist class="chat-list">
    <md-tabs theme='teal'>
      <md-tab header='进行中'>
        <md-collections>
          <md-collection :active='selectedIndex===$index' @click='changeRoster($index)' icon='assignment_ind' v-for='m in chatList' :title='m.from'>
            <p slot='primary' class="grey-text">{{m.data}}</p>
            <p slot='secondary'>{{m.time | time}}
              <br /> <span v-if='m.unread' class="purple-text">{{m.unread}}条未读</span>
            </p>
          </md-collection>
        </md-collections>
      </md-tab>
      <md-tab header='客服同事'>
        <md-collections>
          <md-collection icon='add' v-for='m in agentRosterList' :title='m.name'>
            <p slot='primary' class="grey-text">{{m.name}}
            </p>
            <p slot='secondary'>{{m.loginTime}}</p>
          </md-collection>
        </md-collections>
      </md-tab>
    </md-tabs>
  </div>
  <!-- 聊天信息部分-->
  <div class="chat-area">
    <div v-el:msglist class="msg-list">
      {{nowRoster|json}}
      <msgbox v-for='o in msgList' :side='o.side' :mobile="o.side==='left'?nowRoster.from:user" :time='o.time |datetime'>
        {{{o.data |emojiReg}}}
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
      showEmoji: false,
      emojoList: {},
      msg: '',
      chatList: [],
      selectedIndex: -1,
      notifyAudio: require('../../static/msg.mp3'),
      user: JSON.parse(localStorage.getItem('token')).user
    };
  },
  computed: {
    msgList() {
      return this.selectedIndex > -1 ? this.chatList[this.selectedIndex].msgList : []
    },
    nowRoster() {
      return this.selectedIndex > -1 ? this.chatList[this.selectedIndex] : {}
    },
    iframeSrc() {
      return `http://crm.joplus.cn/im/?visitorImId=${this.nowRoster.from}`
    }
  },
  methods: {
    changeRoster($index) {
      this.selectedIndex = $index
      this.nowRoster.unread = 0
      this.initListScroll()
    },
    sendMsg() {
      if (this.msg) {
        this.msgList.push({
          data: this.msg,
          side: 'right',
          time: new Date().getTime()
        })
        conn.sendTextMessage({
          to: this.nowRoster.from,
          msg: this.msg,
          type: 'chat'
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
      log(this.nowRoster.from)
      conn.sendPicture({
        fileInputId: 'img',
        to: this.nowRoster.from,
        onFileUploadError: e => {
          log(e)
        },
        onFileUploadComplete: data => {
          this.msgList.push({
            data: `<img width='100%' src=${imgObj.url} />`,
            side: 'right',
            time: new Date().getTime()
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
          this.msgList.push({
            data: `<audio controls width='100%' src=${audioObj.url} />`,
            side: 'right',
            time: new Date().getTime()
          })
          this.initListScroll()
        },
        onFileUploadError: e => {
          log(e)
        }
      })
    },
    handleMsg(from, data, type) {
      const findIndex = (arr, field, value) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i][field] === value) return i
        }
        return -1
      }

      // this.$els.notify.load()
      // this.$els.notify.play()
      new Notification(`${from}@${new Date().toLocaleTimeString()}`, {
        body: type === 'text' ? data : type
      })

      let index = findIndex(this.chatList, 'from', from)
      if (index === -1) {
        log('插入', from, data)
        this.chatList.push({
          from,
          data: type === 'text' ? data : type,
          unread: 1,
          time: new Date().getTime(),
          msgList: [{
            data,
            side: 'left',
            time: new Date().getTime()
          }]
        })
      }
      if (index > -1) {
        log(this.nowRoster)
        if (this.nowRoster.from !== from) this.chatList[index].unread += 1
        this.chatList[index].data = type === 'text' ? data : type
        this.chatList[index].time = new Date().getTime()
        this.chatList[index].msgList.push({
          data,
          side: 'left',
          time: new Date().getTime()
        })
        this.initListScroll()
      }
    }
  },

  ready() {
    this.initListScroll()
    this.emojiList = Easemob.im.Helper.EmotionPicData
    let self = this
    window.Notification.requestPermission((per) => {
      if (per !== 'granted') window.alert('您还未启用通知功能!')
    })
    conn.init({
      onTextMessage(msg) {
        log('接收文字消息', msg)
        self.handleMsg(msg.from, msg.data, 'text')
      },
      onPictureMessage(msg) {
        log('接收图片消息', msg)
        self.handleMsg(msg.from, `<img width='100%' src=${msg.url}>`, '[图片文件]')
      },
      onAudioMessage(msg) {
        log('接收音频消息', msg)
        self.handleMsg(msg.from, `<a href='${msg.url}' download='${msg.id}.amr'>${msg.id}.amr</a>`, '[音频文件]')
      },
      onClosed() {
        localStorage.removeItem('token')
        conn.stopHeartBeat(conn)
        conn.clear()
      }
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
