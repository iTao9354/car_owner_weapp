import { logFly } from '@/configs/fly'
import { is_production_env } from '@/utils/env'

/**
 * 发送错误
 * @param errorMsg string
 */
export function error_log (errorMsg: string | any) {
  // 只有生产环境才发日志
  is_production_env && logFly.get('/api/weapp/logs/js', { errorMsg: errorMsg.toString() })
  console.error(errorMsg)
}

/**
 * 点击日志
 * @param data
 */
// export function click_log(data: {
//   resolution: string
//   retina: string
//   routeParams: string
//   routeQuery: string
//   routeHash: string
//   routeUrl: string
//   pageTitle: string
//   pageParams: string
//   pageQuery: string
//   pageUrl: string
// }) {
//   logFly.get('/api/weapp/logs/click', { ...data })
// }