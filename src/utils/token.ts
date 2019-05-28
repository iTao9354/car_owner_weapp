import Taro from '@tarojs/taro'
import { TOKEN_KEY, USER_KEY } from '@/models/key'
import { FlyResponse } from 'flyio'

export function setToken(res: FlyResponse) {
  Taro.setStorageSync(
    TOKEN_KEY,
    (res.headers[TOKEN_KEY] && res.headers[TOKEN_KEY][0]) || ''
  )
}

export function getToken() {
  let token_key = Taro.getStorageSync(TOKEN_KEY)
  return {
    TOKEN_KEY: token_key
  }
}

export function clear() {
  Taro.removeStorageSync(TOKEN_KEY)
  Taro.removeStorageSync(USER_KEY)
}