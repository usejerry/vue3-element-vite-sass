import { GET, POST,JSONP } from '../utils/http'


// 上传文件
export const uploadFile = params =>
  POST({
    params,
    url: '/service-fastdfs/upload'
  })

export const getReservePlanType = params =>
  GET({
    params,
    url: `${route}/reservePlanType`
  })

export const getWeather = params =>
JSONP({
  url: 'https://tianqiapi.com/api',
  params,
})

export default {
  uploadFile,

  // 预案类型
  getReservePlanType
}
