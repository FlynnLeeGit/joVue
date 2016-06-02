const convertCaozuo = () => {
  return `<button class='btn btn-xs btn-default' data-type='edit'>编辑</button>
  <button class='btn btn-xs btn-warning' data-type='down'>下线</button>
  <button class='btn btn-xs btn-info' data-type='up'>上线</button>`
}
const convertDele = (val) => {
  switch (val) {
    case '1':
      return '已下线'
    case '0':
      return '上线中'
    default:
      return val
  }
}

export const activityTableOpts = {
  orderBy: 'isDele',
  columns: [{
    th: '编号',
    field: 'activityNo'
  }, {
    th: '宣传活动名称',
    field: 'acName'
  }, {
    th: '宣传开始时间',
    field: 'startTime'
  }, {
    th: '宣传结束时间',
    field: 'endTime'
  }, {
    th: '是否下线',
    field: 'isDele',
    convert: convertDele
  }, {
    th: '操作',
    convert: convertCaozuo
  }]
}
