const sectionSide = {
  header: '板块管理',
  subPage: [
    { title: '管家会员等级', path: 'MemberList', icon: 'fa-star', shortcut: 'alt+1' },
    { title: '管家服务', path: 'ServiceList', icon: 'fa-heart', shortcut: 'alt+2' },
    { title: '管家合作商', path: 'PartnerList', icon: 'fa-globe', shortcut: 'alt+3' },
    { title: '九宫格管理', path: 'SudokuList', icon: 'fa-table', shortcut: 'alt+4' },
    { title: '活动管理', path: 'ActivityList', icon: 'fa-leaf', shortcut: 'alt+5' }
  ]
}
const orderSide = {
  header: '订单管理',
  subPage: [
    { title: '全部订单', path: 'OrderList', icon: 'fa-list', shortcut: 'alt+6', },
    { title: '不等位/待排队', path: 'OrderList_rest', icon: 'fa-cutlery', shortcut: 'alt+7', },
    { title: '生活服务订单', path: 'OrderList_life', icon: 'fa-hand-peace-o', shortcut: 'alt+8', },
    { title: '会员订单', path: 'OrderList_member', icon: 'fa-child', shortcut: 'alt+9', }
  ]
}

const accountSide = {
  header: '用户管理',
  subPage: [
    { title: '用户列表', path: 'UserList', icon: 'fa-users', shortcut: 'alt+a', },
    { title: '意见反馈', path: 'UserList_advice', icon: 'fa-phone', shortcut: 'alt+b', }
  ]
}

const paycardSide = {
  header: '卡片管理',
  subPage: [
    { title: '支付卡片', path: 'PayCard', icon: 'fa-credit-card', shortcut: 'alt+e' }
  ]
}

const rest_lifeSide = {
  header: '录入板块',
  subPage: [
    { title: '餐厅列表', path: 'RestList', icon: 'fa-glass', shortcut: 'alt+g', },
    { title: '生活服务列表', path: 'LifeList', icon: 'fa-black-tie', shortcut: 'alt+h', }
  ]
}

const couponSide = {
  header: '优惠券',
  subPage: [
    { title: '商家优惠券', path: 'BusinessCouponList', icon: 'fa-bar-chart', shortcut: 'alt+i', },
    { title: '会员优惠券（开发中!）', path: 'MemberCouponList', icon: 'fa-rocket', shortcut: 'alt+k', },
    { title: '服务优惠券（未完成!）', path: 'ServiceCouponList', icon: 'fa-credit-card-alt', shortcut: 'alt+j', },
  ]
}
export default [sectionSide, orderSide, accountSide, paycardSide, rest_lifeSide, couponSide]
