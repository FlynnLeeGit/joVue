const convertCaozuo = () => {
  return `<button class='btn btn-xs btn-default' data-type='edit'>编辑</button>
    <button class='btn btn-xs btn-warning' data-type='under'>下线</button>`

}
const sudokuTableOpts = {
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
    field: 'provider'
  }, {
    th: '添加时间',
    field: 'provider'
  }, {
    th: '操作',
    convert: convertCaozuo
  }, ]
}
export { sudokuTableOpts }
