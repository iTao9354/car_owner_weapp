import Taro from '@tarojs/taro'
import { ResponseError, ResponseNeedLogin } from '@/models/response'
import { FlyModal } from 'flyio'
import { clear } from '@/utils/token'
import { TOKEN_KEY } from '@/models/key'

let Fly: FlyModal
if(process.env.TARO_ENV === 'h5') {
  Fly = require('flyio/dist/npm/fly')
}else {
  Fly = require('flyio/dist/npm/wx')
}

// 全局设置
const tokenFly = new Fly()
const fly = new Fly()

console.log(GLOBAL_BASE_URL)
tokenFly.config.timeout = 10000
tokenFly.config.baseURL = GLOBAL_BASE_URL

fly.config.baseURL = GLOBAL_BASE_URL
fly.config.withCredentials = true

// 拦截器
// 添加请求拦截器
fly.interceptors.request.use(async (request) => {
  try {
    request.headers[TOKEN_KEY] = Taro.getStorageSync(TOKEN_KEY)
    // 加入时间戳清缓存，不过小程序好像没缓存
    if (request.method && request.method.toUpperCase() === 'GET') {
      request.params._ = Date.now()
    }
  } catch(e) {
    console.log(e.errMsg || e.toString())
  }
  return Promise.resolve(request)
})
// 添加响应拦截器
fly.interceptors.response.use(async (response) => {
  if (response.data.code === ResponseError) {
    Taro.showToast({
      title: response.data.message,
      icon: 'none',
      duration: 2000
    })
  } else if(response.data.code === ResponseNeedLogin) {
    // 无权限，需要登录，需要清除本地信息，进入登录weapplogin流程
    clear()
    Taro.reLaunch({
      url: '/pages/login/index?force=true'
    })
  }
  return response
}, (error) => {
  Taro.hideLoading()
  if (error.message.indexOf('timeout') !== -1) {
    Taro.showToast({
      title: '请求超时',
      icon: 'none',
      duration: 2000
    })
  } else if(error) {
    let str = '网络不给力哦，请检查网络状态'
    switch (error.status) {
      case 404:
        str = '访问地址不存在'
        break
      case 500:
        str = '访问地址出现异常'
        break
      case 502:
      case 504:
        str = '服务器不在服务区'
        break
      default:
        break
    }
    Taro.showToast({
      title: str,
      icon: 'none',
      duration: 2000
    })
  } else {
    Taro.showToast({
      title: '出现网络错误,请重试',
      icon: 'none',
      duration: 2000
    })
  }
  return Promise.reject(error)
})

export default fly
