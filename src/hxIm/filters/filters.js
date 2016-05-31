import Vue from 'vue'
Vue.filter('datetime', time => {
  return new Date(time).toLocaleDateString() + ' ' + new Date(time).toLocaleTimeString()
})
