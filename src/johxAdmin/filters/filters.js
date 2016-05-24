import Vue from 'vue'
Vue.filter('datetime', time => {
  return new Date(time).toLocaleDateString() + ' ' + new Date(time).toLocaleTimeString()
})

Vue.filter('toOrderStatusString', status => {
  if (+status === 100001) return '等待支付'
  if (+status === 100002) return '已支付'
  if (+status === 100003) return '已完成'
  if (+status === 100004) return '已取消'
  if (+status === 100005) return '已失效'
  if (+status === 100006) return '已退款'
  return status
})

Vue.filter('toSexString', sex => {
  if (sex === '1') return '先生'
  if (sex === '0') return '女士'
})

Vue.filter('toOrderTypeString', type => {
  if (type === '1') return '不等位'
  if (type === '2') return '待排队'
  if (type === '3') return '会员'
  return type
})

Vue.filter('toIsvipString', isVip => {
  if (isVip === '0') return '否'
  if (isVip === '1') return '是'
})
Vue.filter('toAge', birthTime => {
  return (new Date().getFullYear() - new Date(birthTime).getFullYear())
})
