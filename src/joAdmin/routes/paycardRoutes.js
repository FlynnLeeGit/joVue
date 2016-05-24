export default {
  '/PayCard': {
    name: 'PayCard',
    component: resolve => {
      require(['../views/paycard/PayCard'], resolve)
    }
  },
}
