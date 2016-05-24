const convertPartnerCaozuo = () => {
  return `<button class='btn btn-xs btn-default' data-type='edit'>编辑</button>
  <button class='btn btn-xs btn-danger' data-type='delete'>删除</button>`
}

export const publicityTableOpts = {
  columns: [{
    th: '编号',
    field: 'pubNo'
  }, {
    th: '宣传活动名称',
    field: 'pubName'
  }, {
    th: '宣传开始时间',
    field: 'pubStart'
  }, {
    th: '宣传结束时间',
    field: 'pubEnd'
  }, {
    th: '操作',
    convert: convertPartnerCaozuo
  }]
}
