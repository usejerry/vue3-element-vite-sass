import axios from 'axios' // 引入axios
import './interceptors'

// import {getUrlParam} from './util.js'
axios.defaults.withCredentials = true; 
axios.defaults.baseURL = getBaseUrl()
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'; //传文件设置请求头
/**
 *获取服务器地址
 */
export function getBaseUrl() {
  let baseURL
  // console.log(localStorage.getItem('upNewversion'))
  let g_test = location.href.split('com')[0]
  baseURL=g_test.indexOf('test')>=0?'http://rtsiv.srv.test.tc.netease.com':'http://rtsiv.srv.tc.netease.com/'
  return baseURL
}

export function getCancelToken(){
  return axios.CancelToken
}
// export function getUploadBaseUrl() {
//   let baseURL
//   const env = process.env.NODE_ENV
//   if (env === 'development' || env === 'local') {
//     baseURL = 'http://120.25.147.0/zuul'
//   } else if (env === 'production') {
//     baseURL = 'https://fastdfs.equiplink.cn'
//   }
//   return baseURL
// }

// export function UPLOAD(formData, config) {
//   return axios({
//     baseURL: 'https://fastdfs.equiplink.cn/zuul',
//     url: '/service-fastdfs/upload',
//     data: formData,
//     method: 'post',
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     },
//     ...config
//   }).then(res => res.data)
// }

/**
 * delete 方法，delete
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function DELETE({ url, params }) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function GET({ url, params }) {
  axios.defaults.baseURL = getBaseUrl()
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
/**
 * head方法，对应head请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function HEAD({ url, params }) {
  return new Promise((resolve, reject) => {
    axios
      .head(url, {
        params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function POST({ url, params,com }) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params,com)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function PUT({ url, params }) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
/**
 * patch方法，对应patch请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function PATCH({ url, params }) {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
