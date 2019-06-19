import Taro from '@tarojs/taro'
import { TOKEN_KEY, USER_KEY } from '@/models/key'

export function setToken(token: string) {
  Taro.setStorageSync(TOKEN_KEY, token || '')
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