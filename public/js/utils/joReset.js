/** [对象空化 keepArr为保留的字段数组] */
const has = (arr, ele) => {
    for (let i in arr) {
      if (arr[i] === ele) return true
    }
    return false
  }
  /** [对象空化 keepArr为保留的字段数组] */
const joReset = (OriObj, keepArr = []) => {
  let obj = JSON.parse(JSON.stringify(OriObj))

  function reset(sth) {
    for (let i in sth) {
      // log(i, sth[i])
      if (sth[i] instanceof Object) {
        reset(sth[i])
      } else {
        if (!has(keepArr, i)) sth[i] = ''
      }
    }
  }
  reset(obj)
  return obj
}
export default joReset
