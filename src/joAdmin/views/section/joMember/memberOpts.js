const memberCaozuo = () => {
  return `<button class='btn btn-xs btn-default' data-type='edit'>编辑</button>`
}
const memberTableOpts = {
  nowrap: true,
  columns: [
    { th: '编号', field: 'memberId' },
    { th: '会员描述', field: 'memberLevel' },
    { th: '会员价格', field: 'memberMoney' },
    { th: '操作', convert: memberCaozuo },
  ]
}
export { memberTableOpts }
