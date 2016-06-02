import Vue from 'vue'
Vue.filter('time', time => {
  const date = new Date(time)
  return `${date.getHours()}:${date.getMinutes()}`
})
Vue.filter('datetime', time => {

  return new Date(time).toLocaleDateString() + ' ' + new Date(time).toLocaleTimeString()
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
