export const getQuery = () => {
  let url = document.location.href
  if (url.indexOf('?') > -1) {
    let queryStr = url.split('?')[1]
    if (queryStr.indexOf('&') > -1) {
      let queryArr = queryStr.split('&')
      let map = {}
      queryArr.forEach((val) => {
        map[val.split('=')[0]] = decodeURI(val.split('=')[1])
      })
      return map
    }
  }else{
    return null
  }
}
