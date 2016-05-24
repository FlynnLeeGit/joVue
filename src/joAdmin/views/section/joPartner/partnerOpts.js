const convertPartnerCaozuo = () => {
  return `<button class='btn btn-xs btn-default' data-type='edit'>编辑</button>
  <button class='btn btn-xs btn-danger' data-type='delete'>删除</button>`
}
const convertTime = (time) => {
  return new Date(time).toLocaleDateString()
}
const partnerTableOpts = {
  columns: [{
    th: '编号',
    field: 'partnerNo'
  }, {
    th: '合作商名称',
    field: 'partnerName'
  }, {
    th: '合作商缩写',
    field: 'shortName'
  }, {
    th: '合作商会员名',
    field: 'memberName'
  }, {
    th: '添加时间',
    field: 'createdTime',
    convert: convertTime
  }, {
    th: '操作',
    convert: convertPartnerCaozuo
  }]
}
export {
  partnerTableOpts
}
