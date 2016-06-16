export const aheadTimeOptions = [
  { value: 0, text: '0' },
  { value: 240, text: '4小时' },
  { value: 360, text: '6小时' },
  { value: 480, text: '8小时' },
  { value: 600, text: '10小时' },
  { value: 720, text: '12小时' },
  { value: 1440, text: '一天' },
  { value: 2880, text: '二天' },
  { value: 4320, text: '三天' },
  { value: 5760, text: '四天' },
  { value: 7200, text: '五天' },
  { value: 10080, text: '一周' }
]
export const cuisineIdOptions = [
  { value: 0, text: '请选择' },
  { value: 1, text: '北美菜' },
  { value: 2, text: '创意菜' },
  { value: 3, text: '地中海菜' },
  { value: 4, text: '东南亚菜' },
  { value: 5, text: '韩菜' },
  { value: 6, text: '欧陆菜' },
  { value: 7, text: '南美菜' },
  { value: 8, text: '下午茶' },
  { value: 9, text: '酒吧' },
  { value: 10, text: '日料' },
  { value: 11, text: '中餐' },
  { value: 12, text: '火锅' },
  { value: 13, text: '粤菜' },
  { value: 14, text: '江浙菜' },
  { value: 15, text: '本帮菜' },
  { value: 16, text: '其他' },
  { value: 17, text: '法国菜' },
  { value: 18, text: '美国菜' },
  { value: 19, text: '意大利菜' },
  { value: 20, text: '西班牙菜' },
  { value: 21, text: '创意中菜' },
  { value: 22, text: '墨西哥菜' },
  { value: 23, text: '欧陆创意菜' },
  { value: 25, text: '淮扬菜' },
  { value: 26, text: '鲁菜' }
]
let convertType = (val) => {
  if (+val === 1) return '不等位'
  if (+val === 2) return '待排队'
}
const convertCaozuo = () => {
  return `<button class='btn btn-default btn-xs' data-type='edit'>编辑</button> 
    <button class='btn btn-xs btn-warning' data-type='coupon'>生成优惠券</button>`
}
export const tableOptions = {
  orderBy: 'orderBy',
  asc: 1,
  columns: [
    { th: '编号', field: 'restNo' },
    { th: '酒店名称', field: 'restName' },
    { th: '餐厅类型', field: 'restType', convert: convertType },
    { th: '最新安排日期', field: 'orderDate' },
    { th: '负责bd', field: 'bd' },
    { th: '操作', convert: convertCaozuo }
  ]
}
