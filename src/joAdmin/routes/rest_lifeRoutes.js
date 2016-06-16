export default {
  '/RestList': {
    name: 'RestList',
    component: resolve => {
      require(['../views/rest/RestList'], resolve)
    }
  },
  '/LifeList': {
    name: 'LifeList',
    component: resolve => {
      require(['../views/life/LifeList'], resolve)
    }
  },
  '/EventList': {
    name: 'EventList',
    component: resolve => {
      require(['../views/event/EventList'], resolve)
    }
  },
}
