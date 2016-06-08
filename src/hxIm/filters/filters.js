import Vue from 'vue'
Vue.filter('time', time => {
  return time
})

Vue.filter('datetime', time => {
  return new Date(+time).toLocaleDateString() + ' ' + new Date(+time).toLocaleTimeString()
})
Vue.filter('emojiReg', data => {
  let emojiUrl = emoji => `http://kefu.easemob.com/images/faces/${emoji}`
  let reg = /\[[^\[\]]+\]/g
  if (reg.test(data)) {
    return data.replace(reg, res => `<img src=${emojiUrl(Easemob.im.Helper.EmotionPicData[res])} />`)
  } else {
    return data
  }
})
Vue.filter('emojiUrl', emoji => {
  return `http://kefu.easemob.com/images/faces/${emoji}`
})
Vue.filter('typeMsg', payload => {
  switch (payload.type) {
    case 'txt':
      return payload.msg
    case 'img':
      return `<img src=${payload.url} width=100% />`
    case 'audio':
      return `<audio src=${payload.url} width=80% />`
    default:
      return ''
  }
})
