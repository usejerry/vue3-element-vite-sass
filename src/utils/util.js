// import SparkMD5 from 'spark-md5'

export const isBoolean = obj => typeof obj === 'boolean'
export const isInteger = function(obj) {
  return (obj | 0) === obj
}
export const isNull = function(obj) {
  return obj === undefined || obj === null
}
export const isNoValue = function(obj) {
  return obj === undefined || obj === null || obj === ''
}
export const isEmptyObj = (obj) => {
  for (let obj1 in obj) {
    return false
  }
  return true
}

/**
 * video 获取第一帧
 */
export function initializeImg(id){
  
  var video = document.getElementById(id);
  
  let scale = 0.8;
  var canvas = document.createElement("canvas");
  canvas.width = video.videoWidth * scale;
  canvas.height = video.videoHeight * scale;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  
  var img = document.createElement("img");
  img.src = canvas.toDataURL("image/png");
  img.width = 400;
  img.height = 300;
  console.log(img)
  // video.addEventListener('loadeddata',function(){
  
  //   // return img
  // });
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export function isArray(val) {
  return toString.call(val) === '[object Array]'
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export function isObject(val) {
  return val !== null && typeof val === 'object'
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
export function isString(val) {
  return typeof val === 'string'
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
export function isNumber(val) {
  return typeof val === 'number'
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
export function isUndefined(val) {
  return typeof val === 'undefined'
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
export function isFunction(val) {
  return toString.call(val) === '[object Function]'
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/*
 * 将对象转为url参数字符串【主要用于delete请求，需处理请求】
 * @export
 * @param {*} obj
 * @returns string
 */
export function objToUrl(obj) {
  if (!obj) {
    return ''
  }
  const strArr = []
  Object.entries(obj).map(([key, value]) => {
    strArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    return value
  })
  return strArr.join('&')
}

// 校验手机格式
export function phoneFun(phones) {
  // return /^1[3|4|5|8][0-9]\d{4,8}$/.test(phones)
  let myreg = /^1[3|4|5|8][0-9]\d{4,8}$/
  if (!myreg.test(phones)) {
    return false
  }
  return true
}

/* 唯一标识码 */
const UDIDCODE = 'social_plan_v2_'

/**
 * @desc session存储
 * @export sessionSet
 * @param key key键
 * @param value 值
 */
export function sessionSet(key, value,nostringfy) {
  if (typeof value === 'object'&&(!nostringfy||nostringfy!=='nostringfy')) {
    value = JSON.stringify(value)
  }
  sessionStorage.setItem(UDIDCODE + key, value)
}

/**
 * @desc session获取
 * @export sessionGet
 * @param key key键
 */
export function sessionGet(key) {
  const value = sessionStorage.getItem(UDIDCODE + key) || ''
  try {
    const val = JSON.parse(value)
    if ('number' === typeof val) {
      return value
    }
    return val
  } catch (e) {
    return value
  }
}

/**
 * @desc session移除
 * @export sessionRemove
 * @param key key键
 */
export function sessionRemove(key) {
  sessionStorage.removeItem(UDIDCODE + key)
}

/**
 * @desc session清空
 * @export sessionClearAll
 */
export function sessionClearAll() {
  sessionStorage.clear()
}

// 格式化日期
export const getTime = (date, withSec) => {
  if (date === null) return
  date = new Date(date)
  if (date.toString() === 'Invalid Date') return
  let hour = date.getHours()
  let min = date.getMinutes()
  hour = hour > 9 ? hour : `0${hour}`
  min = min > 9 ? min : `0${min}`
  let result = `${hour}:${min}`
  if (withSec) {
    let sec = date.getSeconds()
    sec = sec > 9 ? sec : `0${sec}`
    result = `${hour}:${min}:${sec}`
  }
  return result
}
export const formatDate = (date, format) => {
  if (date === null) return
  date = new Date(date)
  if (date.toString() === 'Invalid Date') return
  let m = (date.getMonth() + 1).toString()
  let d = date.getDate().toString()
  m = m.length >= 2 ? m : '0' + m
  d = d.length >= 2 ? d : '0' + d
  if (!format) return date.getFullYear() + '-' + m + '-' + d
  if (format === 'Array') return [date.getFullYear(), m + '/' + d]
}
export const formatDateAndTime = (date, withSec) => {
  if (date === null) return
  date = new Date(date)
  if (date.toString() === 'Invalid Date') return
  const dateStr = formatDate(date)
  const timeStr = getTime(date, withSec)
  return `${dateStr} ${timeStr}`
}

// 合并多个数组，去重  
export function arrsconcat(arr1,arr2,arr3){  

  let arrs =  arr1.concat(arr2).concat(arr3)
  var temp = {};   //用于name判断重复
  var result = [];  //最后的新数组
  
  arrs.map(function (item) {
      if(!temp[item.userId]){
          result.push(item);
          temp[item.userId] = true;
      }
  });
  return result;  
} 



/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 */
export function debounce(func, wait) {
  let timeout = null
  wait = wait || 300
  return function() {
    let context = this
    let args = arguments
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
    // if (callNow) callback.apply(this, [callback, ms])
  }
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 */
export function throttle(func, wait) {
  let timeout = null
  return function() {
    let context = this
    let args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait)
    }
  }
}

/* eslint-disable */
export var GPS = {
  PI: 3.14159265358979324,
  x_pi: (3.14159265358979324 * 3000.0) / 180.0,
  delta(lat, lon) {
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    let a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    let ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
    let dLat = this.transformLat(lon - 105.0, lat - 35.0)
    let dLon = this.transformLon(lon - 105.0, lat - 35.0)
    let radLat = (lat / 180.0) * this.PI
    let magic = Math.sin(radLat)
    magic = 1 - ee * magic * magic
    let sqrtMagic = Math.sqrt(magic)
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * this.PI)
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * this.PI)
    return { lat: dLat, lon: dLon }
  },

  // WGS-84 to GCJ-02
  gcj_encrypt(wgsLat, wgsLon) {
    if (this.outOfChina(wgsLat, wgsLon)) {
      return { lat: wgsLat, lon: wgsLon }
    }
    let d = this.delta(wgsLat, wgsLon)
    return { lat: wgsLat + d.lat, lon: wgsLon + d.lon }
  },
  // GCJ-02 to WGS-84
  gcj_decrypt(gcjLat, gcjLon) {
    if (this.outOfChina(gcjLat, gcjLon)) {
      return { lat: gcjLat, lon: gcjLon }
    }
    let d = this.delta(gcjLat, gcjLon)
    return { lat: gcjLat - d.lat, lon: gcjLon - d.lon }
  },
  // GCJ-02 to WGS-84 exactly
  gcj_decrypt_exact(gcjLat, gcjLon) {
    let initDelta = 0.01
    let threshold = 0.000000001
    let dLat = initDelta
    let dLon = initDelta
    let mLat = gcjLat - dLat
    let mLon = gcjLon - dLon
    let pLat = gcjLat + dLat
    let pLon = gcjLon + dLon
    let wgsLat
    let wgsLon
    let i = 0
    while (1) {
      wgsLat = (mLat + pLat) / 2
      wgsLon = (mLon + pLon) / 2
      let tmp = this.gcj_encrypt(wgsLat, wgsLon)
      dLat = tmp.lat - gcjLat
      dLon = tmp.lon - gcjLon
      if (Math.abs(dLat) < threshold && Math.abs(dLon) < threshold) {
        break
      }
      if (dLat > 0) pLat = wgsLat
      else mLat = wgsLat
      if (dLon > 0) pLon = wgsLon
      else mLon = wgsLon

      if (++i > 10000) break
    }
    return { lat: wgsLat, lon: wgsLon }
  },
  // GCJ-02 to BD-09
  bd_encrypt(gcjLat, gcjLon) {
    let x = gcjLon
    let y = gcjLat
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * this.x_pi)
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * this.x_pi)
    let bdLon = z * Math.cos(theta) + 0.0065
    let bdLat = z * Math.sin(theta) + 0.006
    return { lat: bdLat, lon: bdLon }
  },
  // BD-09 to GCJ-02
  bd_decrypt(bdLat, bdLon) {
    let x = bdLon - 0.0065
    let y = bdLat - 0.006
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * this.x_pi)
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * this.x_pi)
    let gcjLon = z * Math.cos(theta)
    let gcjLat = z * Math.sin(theta)
    return { lat: gcjLat, lon: gcjLon }
  },
  // WGS-84 to Web mercator
  // mercatorLat -> y mercatorLon -> x
  mercator_encrypt(wgsLat, wgsLon) {
    let x = (wgsLon * 20037508.34) / 180
    let y = Math.log(Math.tan(((90 + wgsLat) * this.PI) / 360)) / (this.PI / 180)
    y = (y * 20037508.34) / 180
    return { lat: y, lon: x }
  },
  // Web mercator to WGS-84
  // mercatorLat -> y mercatorLon -> x
  mercator_decrypt(mercatorLat, mercatorLon) {
    let x = (mercatorLon / 20037508.34) * 180
    let y = (mercatorLat / 20037508.34) * 180
    y = (180 / this.PI) * (2 * Math.atan(Math.exp((y * this.PI) / 180.0)) - this.PI / 2)
    return { lat: y, lon: x }
  },
  // two point's distance
  distance(latA, lonA, latB, lonB) {
    let earthR = 6371000
    let x = Math.cos((latA * this.PI) / 180.0) * Math.cos((latB * this.PI) / 180.0) * Math.cos(((lonA - lonB) * this.PI) / 180)
    let y = Math.sin((latA * this.PI) / 180.0) * Math.sin((latB * this.PI) / 180.0)
    let s = x + y
    if (s > 1) s = 1
    if (s < -1) s = -1
    let alpha = Math.acos(s)
    let distance = alpha * earthR
    return distance
  },
  outOfChina(lat, lon) {
    if (lon < 72.004 || lon > 137.8347) {
      return true
    }
    if (lat < 0.8293 || lat > 55.8271) {
      return true
    }
    return false
  },
  transformLat(x, y) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
    ret += ((20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0) / 3.0
    ret += ((20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin((y / 3.0) * this.PI)) * 2.0) / 3.0
    ret += ((160.0 * Math.sin((y / 12.0) * this.PI) + 320 * Math.sin((y * this.PI) / 30.0)) * 2.0) / 3.0
    return ret
  },
  transformLon(x, y) {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
    ret += ((20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0) / 3.0
    ret += ((20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin((x / 3.0) * this.PI)) * 2.0) / 3.0
    ret += ((150.0 * Math.sin((x / 12.0) * this.PI) + 300.0 * Math.sin((x / 30.0) * this.PI)) * 2.0) / 3.0
    return ret
  }
}
/* eslint-enable */

export function dataURLtoFile(dataurl, filename = 'file') {
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let suffix = mime.split('/')[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], `${filename}.${suffix}`, {type: mime})
}


const getType = param => Object.prototype.toString.call(param)
const isDate = date => getType(date) === '[object Date]'

export function getDate(time, ms) {
  var date
  if (typeof time === 'string') {
    // date = new Date(time.replace(/-/g, '/'))
    date = new Date(time)
  } else if (isDate(time)) {
    date = time
  } else {
    date = new Date(time * (ms))
  }
  return date
}

//  format : y年m月d日 h:m:s
/**
 * @param {*} time 时间可以是毫秒，也可以是秒
 * @param {*} format 格式
 * @param {*} ms 是否毫秒
 */
export function formatLocalDate(time, format = 'Y年M月D日 h:m:s', ms = 1) {
  var date = getDate(time, ms)
  var args = {
    Y: date.getFullYear(),
    M: formatNumber(date.getMonth() + 1),
    D: formatNumber(date.getDate()),

    h: formatNumber(date.getHours()),
    m: formatNumber(date.getMinutes()),
    s: formatNumber(date.getSeconds())
  }

  return format.replace(/Y|M|D|h|m|s/g, match => args[match])
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 项目时间筛选
export function timeFilter(time) {
  let getTime = new Date(time)
  let text = ''
  if(getTime.getFullYear() == new Date().getFullYear()){
      text = formatLocalDate(time,'M月D日 h:m:s')
  }else{
      text = formatLocalDate(time,'Y年M月D日 h:m:s')
      console.log(formatLocalDate(time,'Y年M月D日 h:m:s'))
  }
  return text
}
// 数组数值 返回时间
export function arrFormatLocalDate(arr){
  return formatLocalDate(new Date(`${arr[0]}-${arr[1]}-${arr[2]} ${arr[3]}:${arr[4]}`))
}

// 数组数值 返回时间2
export function arrFormatLocalDate2(arr){
  return new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4])
}

// 数组数值 h：m
export function getHourM(arr){
  let time = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4])
  return formatNumber(time.getHours())+':'+ formatNumber(time.getMinutes())
}
//返回 时间 格式 2020年12月30日 星期三

export function FormatLocalDate3(arr){
  let time = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4])
  let xq ={0:'-',1:'二',2:'三',3:'四',4:"五",5:'六',6:'日'}
  return `${formatLocalDate(time,'Y年M月D日')} 星期${xq[new Date(time).getDay()]}`
}

    // 一键复制
export function textcode(text){
      var n = document.createElement("input");
      n.setAttribute("value", text)
        document.body.appendChild(n);
        n.select();
        document.execCommand("copy");
        document.body.removeChild(n);
        alert("\u590d\u5236\u6210\u529f")
  }

// 进入全屏
export function fullScreen() {
  const main = document.body

  if (main.requestFullscreen) {
    main.requestFullscreen()
  } else if (main.mozRequestFullScreen) {
    main.mozRequestFullScreen()
  } else if (main.webkitRequestFullScreen) {
    main.webkitRequestFullScreen()
  } else if (main.msRequestFullscreen) {
    main.msRequestFullscreen()
  }
}
export function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  // if (r != null) return r[2];
  if (r != null){
      var reg2 = new RegExp("\\+","g");
      var r2 = r[2].replace(reg2, "%20");
      // return decodeURIComponent(r[2]);
      return decodeURIComponent(r2);
  }
  return "";
}
// 退出全屏
export function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

export function transformation(limit) {
  var size = "";
    if(limit < 0.1 * 1024){                            //小于0.1KB，则转化成B
        size = limit.toFixed(2) + "B"
    }else if(limit < 0.1 * 1024 * 1024){            //小于0.1MB，则转化成KB
        size = (limit/1024).toFixed(2) + "KB"
    }else if(limit < 0.1 * 1024 * 1024 * 1024){        //小于0.1GB，则转化成MB
        size = (limit/(1024 * 1024)).toFixed(2) + "MB"
    }else{                                            //其他转化成GB
        size = (limit/(1024 * 1024 * 1024)).toFixed(2) + "GB"
    }

    var sizeStr = size + "";                        //转成字符串
    var index = sizeStr.indexOf(".");                    //获取小数点处的索引
    var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
    if(dou == "00"){                                //判断后两位是否为00，如果是则删除00                
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return size;
}


export function deleteA(arr,id,nex){
  arr.forEach((item,index)=>{
    if(item[id]==nex){
      arr.splice(index,1)
    }
  })
  return arr
}
// 根据 某个值 获取数据
export function getIdData(key,data,gokey){
  let ss =null
  data.forEach(item=>{
    if(item[key]==gokey){
      ss = item
    }
  })
  return ss
}
export  function  treeFlat(Node) {
      let _arr = [];

      let point = Node;
      let a = true;
      while (a) {
        if (point.parent) {
          _arr.push(point);
          point = point.parent;
        } else {
          a = false;
          return _arr.reverse();
        }
      }
}

export function treeflat2(tree){
  let re_data = []
  go(tree)
  function go(arr){
    arr.forEach((item) => {
        go(item.children);
        // re_data =re_data.concat(item.user);
        item.user.forEach(item2 => {
          re_data.push(item2)
        })
    });
  }
  return re_data
}

export function downFg(url){
  let link = document.createElement("a");
  link.target="_blank"
  link.href = url; //对下载的文件命名
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function arrangement(data){


  let jurisdictionData = {
    // 'wp':{
      createFolder: {show:false,funName:"新建文件夹"},  //新建文件夹
      editFolder:{show:false,funName:"编辑文件夹"},     //编辑文件夹 
      deleteFolder:{show:false,funName:"删除文件夹"},  //删除文件夹
      uploadFile:{show:false,funName:"上传文件"},   //上传文件
      deleteFile:{show:false,funName:"删除文件"}, // 删除文件 
      editFile:{show:false,funName:"编辑文件"},   // 编辑文件
      seeFileRecord:{show:false,funName:"查看文件操作记录"}, // 查看文件操作记录
      addLink:{show:false,funName:"添加原件链接"}, //添加原件链接 
      switchType: {show:false,funName:"切换稿件状态"}, // 切换稿件状态
      addGJUsersAndcreateCatalogue:  {show:false,funName:"添加目录/文件可见用户"}, // 添加目录/文件可见用户
      addYJUsers: {show:false,funName:"添加原件可见用户"}, // 添加原件可见用户
    // },
    // 'xm':{
      createXM:{show:false,funName:"新建项目"},  // 新建项目
      xmSet: {show:false,funName:"项目设置"},    // 项目设置
      deleteXM: {show:false,funName:"删除项目"},  // 删除项目
      archivedXM: {show:false,funName:"归档项目"},// 归档项目
      seeArchivedXM: {show:false,funName:"查看归档项目"},// 查看归档项目
      createTask: {show:false,funName:"新建任务"},// 新建任务
      editTask: {show:false,funName:"编辑任务"}, // 编辑任务
      deleteTask: {show:false,funName:"删除任务"}, // 删除任务
      addEnclosure: {show:false,funName:"添加任务附件"}, // 添加附件
      deleteEnclosure: {show:false,funName:"删除任务附件"},// 删除附件
      downloadEnclosure: {show:false,funName:"下载任务附件"},// 下载任务附件
    // },
    // 'ht':{
      memberManagement: {show:false,funName:"成员管理"}, // 成员管理
      examine: {show:false,funName:"审核"},  // 审核
    // },
    // 'cg':{
      roleManagement:{show:false,funName:"角色管理"}// 角色管理 
    // }
  } 
  data.forEach(item => {
    for (const key in jurisdictionData) {
      if(item.authorityDesc == jurisdictionData[key].funName){
        jurisdictionData[key].show = true
      }
    }
  })

  return jurisdictionData
}

export default {
  getDate,
  formatLocalDate
}