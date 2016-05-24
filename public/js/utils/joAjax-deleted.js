import { ajax } from 'jquery' // 只引入ajax模块
const joAjax = {
  get(url) {
    console.log(`get请求开始${url}...`)
    return new Promise((resolve, reject) => {
      ajax({
        url: url,
        type: 'get',
        dataType: 'json',
        success(result) {
          console.log('返回数据', result)
          resolve(result)
        },
        error(err) {
          window.alert('服务器连接失败！')
          reject(err)
        }
      })
    })
  },
  postFile(url, formobj) {
    console.log(`post请求${url}开始...发送文件中`, formobj[Object.keys(formobj)[0]])
    return new Promise((resolve, reject) => {
      /** @type {formData} [formData对象 保存二进制] */
      let formData = new window.FormData()
      formData.append(Object.keys(formobj)[0], formobj[Object.keys(formobj)[0]])
      ajax({
        url: url,
        type: 'post',
        data: formData,
        processData: false, // 阻止jquery对formdata的默认处理
        contentType: false, // 阻止添加头信息
        dataType: 'json',
        success(result) {
          console.table('返回数据', result)
            // console.log('返回数据', result)
          resolve(result)
        },
        error(err) {
          window.alert('服务器错误')
          reject(err)
        }
      })
    })
  },
  post(url, data) {
    console.log(`post请求${url}开始... 请求数据`, data, typeof data)
    return new Promise((resolve, reject) => {
      ajax({
        url: url,
        type: 'post',
        data: data,
        dataType: 'json',
        success(result) {
          // console.table(result)
          console.log('返回数据', result)
          resolve(result)
        },
        error(err) {
          window.alert('服务器连接失败！')
          reject(err)
        }
      })
    })
  },
  put(url, data) {
    console.log('put请求开始... 请求数据', data)
    return new Promise((resolve, reject) => {
      ajax({
        url: url + '_method=PUT',
        type: 'post',
        data: data,
        success(result) {
          console.log('返回数据', result)
          resolve(result)
        },
        error(err) {
          window.alert('服务器连接失败！')
          reject(err)
        }
      })
    })
  },
  delete(url, data) {
    console.log(`delete请求${url}开始... 请求数据`, data)
    return new Promise((resolve, reject) => {
      ajax({
        url: url + '?_method=DELETE',
        type: 'post',
        data: data,
        success(result) {
          console.log('返回数据', result)
          resolve(result)
        },
        error(err) {
          window.alert('服务器连接失败！')
          reject(err)
        }
      })
    })
  }
}
export default joAjax
