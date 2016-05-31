export const orderStatusOptions = [
  { value: '', text: '全部' },
  { value: 100001, text: '等待支付' },
  { value: 100002, text: '已支付' },
  { value: 100003, text: '已完成' },
  { value: 100004, text: '已取消' },
  { value: 100005, text: '已失效' },
  { value: 100006, text: '已退款' }
]
export const orderTypeOptions = [
  { value: '', text: '全部' },
  { value: 1, text: '不等位' },
  { value: 2, text: '待排队' },
  { value: '医院', text: '医院' },
  { value: '蛋糕', text: '蛋糕' },
  { value: '票务', text: '票务' },
  { value: '鲜花', text: '鲜花' },
  { value: '酒管家', text: '酒管家' },
  { value: '预约专家', text: '预约专家' }
]

export const orderVipOptions = [
  { value: '', text: '全部' },
  { value: 1, text: '是会员' },
  { value: 0, text: '非会员' }
]
export const buyTypeOpts = [
    { value: '', text: '全部' },
    { value: '购买', text: '通过购买' },
    { value: '升级', text: '通过升级' },
  ]
  /** [table 选项] */
const convertOrderType = (val) => {
  if (+val === 1) return '不等位'
  if (+val === 2) return '待排队'
  if (+val === 3) return '会员'
  return val
}
const convertStatus = (val) => {
  switch (+val) {
    case 100001:
      return '等待支付'
    case 100002:
      return '已支付'
    case 100003:
      return '已完成'
    case 100004:
      return '已取消'
    case 100005:
      return '已失效'
    case 100006:
      return '已退款'
    default:
      return val
  }
}
const convertVip = (val) => {
  if (val === '0') return '否'
  if (val === '1') return '是'
  return val
}
const convertPrice = (val) => {
  return `￥${val}`
}
const convertDeal = (val) => {
  if (+val === 0) return `<button class='btn btn-xs btn-default' data-type='deal'>处理</button>`
  if (+val === 1) return `<button class='btn btn-xs btn-success'>已处理</button>`
  return val
}
const convertOpt = () => {
  // 这里不需要val 因为字段名称只是占位的
  return `<button class='btn btn-xs btn-danger' data-type='payback'>退款</button>
  <button class='btn btn-xs  cancel' data-type='cancel'>取消</button>`
}
const mergeNameSexNum = (name, sex, num) => {
  if (sex === '1')
    sex = '先生'
  if (sex === '0')
    sex = '女士'
  return `${name}${sex}/${num}人`
}
const mergeNameSex = (name, sex) => {
  if (sex === '1') sex = '先生'
  if (sex === '0') sex = '女士'
  return `${name}${sex}`
}
export const tableOptions = {
  orderBy: 'orderDate',
  asc: -1,
  nowrap: true,
  columns: [{
    th: '订单类型',
    field: 'orderType',
    convert: convertOrderType
  }, {
    th: '下单时间',
    field: 'orderDate'
  }, {
    th: '手机号',
    field: 'orderPhone'
  }, {
    th: '称谓',
    field: 'bookerName@bookerSex@personNum',
    merge: mergeNameSex
  }, {
    th: '会员等级',
    field: 'memberLevel',
  }, {
    th: '订单金额',
    field: 'orderMoney',
    convert: convertPrice
  }, {
    th: '实付金额',
    field: 'paidMoney',
    convert: convertPrice
  }, {
    th: '订单状态',
    field: 'orderStatus',
    convert: convertStatus
  }, {
    th: '订单编号',
    field: 'orderNo'
  }, ]
}
export const tableRestOptions = {
  nowrap: true,
  orderBy: 'orderDate',
  asc: -1,
  columns: [{
    th: '订单类型',
    field: 'orderType',
    convert: convertOrderType
  }, {
    th: '下单时间',
    field: 'orderDate'
  }, {
    th: '手机orderPhone',
    field: 'orderPhone'
  }, {
    th: '会员',
    field: 'isVip',
    convert: convertVip
  }, {
    th: '餐厅',
    field: 'restName'
  }, {
    th: '预约时间',
    field: 'eatDate'
  }, {
    th: '称谓/人数',
    field: 'bookerName@bookerSex@personNum',
    merge: mergeNameSexNum
  }, {
    th: '预约手机bookerPhone',
    field: 'bookerPhone'
  }, {
    th: '状态',
    field: 'orderStatus',
    convert: convertStatus
  }, {
    th: '客服',
    field: 'isDeal',
    convert: convertDeal
  }, {
    th: '操作',
    convert: convertOpt
  }, {
    th: '备注',
    field: 'memo'
  }, {
    th: '订单编号',
    field: 'orderNo'
  }, ]
}
const convertDetail = () => {
  return `<button class='btn btn-xs btn-default' data-type='detail'>订单详情</button>`
}
export const tableLifeOptions = {
  nowrap: true,
  orderBy: 'orderDate',
  asc: -1,
  columns: [{
    th: '订单详情',
    field: 'orderType',
    convert: convertDetail
  }, {
    th: '订单类型',
    field: 'orderType',
    convert: convertOrderType
  }, {
    th: '下单时间',
    field: 'orderDate'
  }, {
    th: '称谓',
    field: 'bookerName@bookerSex@personNum',
    merge: mergeNameSexNum
  }, {
    th: '手机orderPhone',
    field: 'orderPhone'
  }, {
    th: '下单金额',
    field: 'orderMoney',
    convert: convertPrice
  }, {
    th: '实付金额',
    field: 'paidMoney',
    convert: convertPrice
  }, {
    th: '会员',
    field: 'isVip',
    convert: convertVip
  }, {
    th: '状态',
    field: 'orderStatus',
    convert: convertStatus
  }, {
    th: '客服',
    field: 'isDeal',
    convert: convertDeal
  }, {
    th: '操作',
    convert: convertOpt
  }, {
    th: '备注',
    field: 'memo'
  }, {
    th: '订单编号',
    field: 'orderNo'
  }, ]
}

export const tableMemberOpts = {
  nowrap: true,
  columns: [{
    th: '购买类型',
    field: 'buyType'
  }, {
    th: '会员描述',
    field: 'memberLevel'
  }, {
    th: '会员价格',
    field: 'memberMoney'
  }, {
    th: '下单手机号',
    field: 'orderPhone'
  }, {
    th: '下单时间',
    field: 'orderDate'
  }, {
    th: '支付金额',
    field: 'orderMoney',
    convert: convertPrice
  }, {
    th: '支付方式',
    field: 'vipWay'
  }, {
    th: '订单编号',
    field: 'orderNo'
  }]
}
