export default {
  '/UserList': {
    name: 'UserList',
    component: resolve => {
      require(['../views/user/UserList'], resolve)
    }
  },
  '/UserList_advice': {
    name: 'UserList_advice',
    component: resolve => {
      require(['../views/user/UserList_advice'], resolve)
    }
  },
}
