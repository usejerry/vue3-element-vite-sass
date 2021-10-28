import axios from 'axios' // 引入axios
// import store from '@/store'
// import apiCode from './api-code'
import router from '@/router'


// import { sessionGet,sessionRemove } from '@/utils/util'
// let timer

// axios.defaults.timeout = 60000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

/**
 * 请求拦截器
 */
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token;
    // const token = sessionGet('token')
    
    // token && (config.headers.Authorization = 'Bearer ' + token)

    // if (config.data instanceof FormData) {
    //   config.headers['Content-Type'] = 'multipart/form-data'
    // }
    return config
  },
  error => error
)

/**
 * 响应拦截器
 */
axios.interceptors.response.use(
  (response) => {
    const data = response.data
    // alert(22,data)
    // if(!data.succ){
    //   Message.error(data.message)
    // }
    // let {newversion} = router.query
    if(data.code == '205'||data.code == '-1'){
      let isnewversion = window.location.href.indexOf('newversion')>-1
      setTimeout(() => {
        if(!isnewversion){
          router.replace({
            path: '/login',
          })   
        }else{
          router.replace({
            path: '/login',
            query: {newversion:'1'}
          }) 
        }        
      },1000)
    }
    // console.log(window.location.href)
    // switch (data.code) {
    //   case '205':
    //     Message.error('登录过期，请重新登录')
    //     setTimeout(() => {
    //       router.replace({
    //         path: '/login',
    //       })
    //     }, 1000)
    //     break;
    //     case '-1':
    //       Message.error('登录过期，请重新登录')
    //       setTimeout(() => {
    //         // if(newversion){
    //         //   router.replace({
    //         //     path: '/login',
    //         //   })              
    //         // }
    //         router.replace({
    //           path: '/login',
    //         })
    //       }, 1000)
    //       break;
    //   default:
    //     break;
    // }
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error)
  }
)
