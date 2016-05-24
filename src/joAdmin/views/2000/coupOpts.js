const convertCaozuo = () => {
  return `<button class='btn btn-xs btn-default edit'>编辑</button>
	<button class='btn btn-xs btn-danger delete'>删除</button>`
}
const memberTableOpts = {
  columns: [
    { th: '品类', field: 'cateType' },
    { th: '优惠金额', field: 'conditionMoney' },
    { th: '显示', field: 'showContent' },
    { th: '显示文字', field: 'content' },
    { th: '数量', field: 'num' },
    { th: '使用备注', field: '使用备注' },
    { th: '操作', convert: convertCaozuo }
  ]
}
export {
  memberTableOpts
}

