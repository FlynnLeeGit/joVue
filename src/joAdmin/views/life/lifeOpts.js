const tablist = [{
  title: '生活类型',
  page: 'lifeType'
}, {
  title: '分店信息',
  page: 'lifeSubshop'
}, {
  title: '商家介绍',
  page: 'lifeIntro'
}]
const convertCaozuo = () => {
  return `<button class='btn btn-xs btn-default' data-type='edit'>编辑</button>
      <button class='btn btn-xs btn-warning' data-type='coup'>生成优惠券</button>
  `
}
const lifeTableOpts = {
  pageCount: 15,
  columns: [
    { th: '编号Id', field: 'lifeId' },
    { th: '商家名称', field: 'lifeName' },
    { th: '商家类型', field: 'lifeType' },
    { th: '最新安排日期', field: 'orderDate' },
    { th: '负责bd', field: 'bd' },
    { th: '操作', convert: convertCaozuo }
  ]
}
export { tablist, lifeTableOpts }
