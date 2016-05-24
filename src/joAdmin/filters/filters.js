export const limitPage = (arr, pageCount, startPage) => {
  pageCount = +pageCount // must Number!
  startPage = +startPage // must Number!
  if (!startPage) {
    return arr.slice(0, pageCount)
  } else {
    // console.log('条数', pageCount, '起始页', startPage, '数据', arr)
    let limitArr = arr.slice(startPage * pageCount, startPage * pageCount + pageCount)
      // console.log('slice后', a)
    return limitArr
  }
}
export const orderByChs = (arr, sortKey, reverse = 1) => {
  if (!sortKey) return arr // 没有排序字串直接返回

  return arr.slice().sort((a, b) => {
    if (!a[sortKey]) a[sortKey] = ''
    if (!b[sortKey]) b[sortKey] = ''
    return a[sortKey].toString().localeCompare(b[sortKey].toString()) * reverse
  })
}
