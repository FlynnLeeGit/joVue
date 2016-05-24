const isVipOpts = [
  { value: '', text: '全部' },
  { value: 1, text: '会员' },
  { value: 0, text: '非会员' }
]
const vipWayOpts = [
  { value: '', text: '全部' },
  { value: 'code', text: '邀请码会员' },
  { value: 'buy', text: '购买会员' }
]
const convertVip = (val) => {
  if (val === '1') return '是'
  if (val === '0') return '否'
  return val
}
const convertPaycard = () => {
  return "<button class='btn btn-xs btn-primary' data-type='card'>生成卡片</button>"
}
const tableOpts = {
  pageCount: 10,
  orderBy: 'loginTime',
  asc: -1,
  columns: [
    { th: '会员名称', field: 'userName' },
    { th: '手机号', field: 'mobile' },
    { th: '是否会员', field: 'isVip', convert: convertVip },
    { th: '购买方式', field: 'vipWay' },
    { th: '注册时间', field: 'registerTime' },
    { th: '最近登录时间', field: 'loginTime' },
    { th: '会员时间', field: 'vipDate' },
    { th: '生成卡片', convert: convertPaycard }
  ]
}

const toDate = (time) => {
  return new Date(time).toLocaleDateString()
}
const tableAdviceOpts = {
  pageCount: 10,
  columns: [
    { th: '用户名', field: 'accountName' },
    { th: '时间', field: 'backDate', convert: toDate },
    { th: '反馈内容', field: 'content' }
  ]
}
export {
  isVipOpts,
  vipWayOpts,
  tableOpts,
  tableAdviceOpts
}
