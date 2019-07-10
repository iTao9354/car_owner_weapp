import Taro from '@tarojs/taro'
import { ENV_KEY } from '@/models/key'
import { clear } from './token'
import { error_log } from './log'

const ENV = process.env.NODE_ENV

/**
 * 本机清缓存，用于一台手机经常切换环境清除storage
 * 生产环境不使用
 */
export function isCurrentEnv () {
  try {
    // 生产环境不清除
    if (!is_production_env()) {
      const storageEnv = Taro.getStorageSync(ENV_KEY)
      if (ENV !== storageEnv) {
        clear()
        Taro.setStorageSync(ENV_KEY, ENV)
      }
    }
  } catch (e) {
    error_log(e)
  }
}

/**
 * 是否是生产环境
 */
export function is_production_env () {
  return ENV === 'production'
}