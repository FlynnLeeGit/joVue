export default {
  '/OrderList': {
    name: 'OrderList',
    component: resolve => {
      require(['../views/order/OrderList'], resolve)
    }
  },
  '/OrderList_rest': {
    name: 'OrderList_rest',
    component: resolve => {
      require(['../views/order/OrderList_rest'], resolve)
    }
  },
  '/OrderList_life': {
    name: 'OrderList_life',
    component: resolve => {
      require(['../views/order/OrderList_life'], resolve)
    }
  },
  'OrderList_member': {
    name: 'OrderList_member',
    component: resolve => {
      require(['../views/order/OrderList_member'], resolve)
    }
  }
}
