require('es6-promise').polyfill()
require('isomorphic-fetch')
const joFetch = {
  checkStatus(res) {
    return res.ok ? res : console.error(`status:${res.status}**StatusText:${res.statusText}**${res.url}`)
  },
  formatParams(params = {}) {
    let query = []
    for (let i in params) {
      query.push(`${i}=${encodeURIComponent(params[i])}`)
    }
    return query.join('&')
  },
  createformData(params = {}) {
    let fd = new FormData()
    for (let i in params) {
      fd.append(i, params[i])
    }
    return fd
  },
  log(json) {
    console.info(`fetch原始数据`, json)
    return json
  },
  get(url, params = {}) {
    console.info('GET请求数据 参数', params, `请求地址${url}`)
    return window.fetch(url + '?' + this.formatParams(params))
      .then(this.checkStatus)
      .then(res => res.json())
      .then(this.log)
  },
  post(url, params) {
    console.info('POST请求数据 参数', params, `请求地址${url}`)
    return window.fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: this.formatParams(params)
      })
      .then(this.checkStatus)
      .then(res => res.json())
      .then(this.log)
  },
  postFile(url, params) {
    console.info('POST上传文件数据 参数', params, `请求地址${url}`)
    return window.fetch(url, {
        method: 'POST',
        body: this.createformData(params)
      })
      .then(this.checkStatus)
      .then(res => res.json())
      .then(this.log)
  },
  delete(url, params) {
    url += '?_method=DELETE'
    console.info('POST模拟DELETE请求数据 参数', params, `请求地址${url}`)
    return window.fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: this.formatParams(params)
      })
      .then(this.checkStatus)
      .then(res => res.json())
      .then(this.log)
  }
}
module.exports = joFetch
