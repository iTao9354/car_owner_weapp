import Taro from '@tarojs/taro'
import { ENV_KEY } from '@/models/key'
import { clear } from '@/utils/token'

const ENV = process.env.NODE_ENV

export function isCurrentEnv () {
  try {
    const storageEnv = Taro.getStorageSync(ENV_KEY)
    if (ENV !== storageEnv) {
      clear()
      Taro.setStorageSync(ENV_KEY, ENV)
    }
  } catch (e) {}
}
