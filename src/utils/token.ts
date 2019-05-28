import Taro from '@tarojs/taro'
import { OPEN_ID_KEY, TOKEN_KEY, USER_KEY } from '@/models/key'
import { FlyResponse } from 'flyio'

export function setToken(res: FlyResponse) {
  Taro.setStorageSync(
    OPEN_ID_KEY,
    (res.headers[OPEN_ID_KEY] && res.headers[OPEN_ID_KEY][0]) || ''
  )
  Taro.setStorageSync(
    TOKEN_KEY,
    (res.headers[TOKEN_KEY] && res.headers[TOKEN_KEY][0]) || ''
  )
}

export function getToken() {
  let open_id_key = Taro.getStorageSync(OPEN_ID_KEY)
  let token_key = Taro.getStorageSync(TOKEN_KEY)
  return {
    OPEN_ID_KEY: open_id_key,
    TOKEN_KEY: token_key
  }
}

export function clear() {
  Taro.removeStorageSync(OPEN_ID_KEY)
  Taro.removeStorageSync(TOKEN_KEY)
  Taro.removeStorageSync(USER_KEY)
}