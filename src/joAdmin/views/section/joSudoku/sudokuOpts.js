const convertCaozuo = () => {
  return `<button class='btn btn-xs btn-default' data-type='edit'>编辑</button>
    <button class='btn btn-xs btn-warning' data-type='under'>下线</button>`

}
const convertTime = (time) => {
  return new Date(time).toLocaleDateString()
}

const sudokuTableOpts = {
  orderBy: 'serStatus',
  asc: -1,
  columns: [{
    th: '编号',
    field: 'serNo'
  }, {
    th: '分类',
    field: 'serName'
  }, {
    th: '服务',
    field: 'serCategory'
  }, {
    th: '状态',
    field: 'serStatus'
  }, {
    th: '更新时间',
    field: 'updateTime',
    convert: convertTime
  }, {
    th: '操作',
    convert: convertCaozuo
  }, ]
}
export { sudokuTableOpts }
