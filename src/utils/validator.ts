// 手机号检测
export function MobileValid (mobile) {
  try {
    return /^1[3|4|5|7|8]\d{9}$/.test(mobile)
  } catch (e) {
    return false
  }
}

// 验证码校验
export function CaptchaValid (captcha, length = 6) {
  try {
    return captcha.length === length
  } catch (e) {
    return false
  }
}