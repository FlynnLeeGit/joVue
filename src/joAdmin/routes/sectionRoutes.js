export default {
  '/PartnerList': {
    name: 'PartnerList',
    component: resolve => {
      require(['../views/section/joPartner/PartnerList'], resolve)
    }
  },
  '/ServiceList': {
    name: 'ServiceList',
    component: resolve => {
      require([`../views/section/joService/ServiceList`], resolve)
    }
  },
  '/MemberList': {
    name: 'MemberList',
    component: resolve => {
      require([`../views/section/joMember/MemberList`], resolve)
    }
  },
  '/SudokuList': {
    name: 'SudokuList',
    component: resolve => {
      require([`../views/section/joSudoku/SudokuList`], resolve)
    }
  },
}
