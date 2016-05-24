const priceAndRight = (price, right) => {
  return `${price}元/次|${right}次`
}
const convertCaozuo = () => {
  return `<button class='btn btn-xs btn-default' data-type='edit'>编辑</button>
    <button class='btn btn-xs btn-danger' data-type='delete'>删除</button>`

}
const serviceTableOpts = {
  columns: [{
    th: '编号',
    field: 'serNo'
  }, {
    th: '服务',
    field: 'serName'
  }, {
    th: '分类',
    field: 'serCategory'
  }, {
    th: '供应商',
    field: 'provider'
  }, {
    th: '操作',
    convert: convertCaozuo
  }, ]
}
export { serviceTableOpts }
