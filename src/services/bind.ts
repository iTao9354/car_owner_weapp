import fly from '@/configs/fly'
import { ResponseNullModel } from '@/models/response'
import { BindFormModel } from '@/models/bind'

export class BindService {
  // 发送验证码
  doSendSms (mobile: string) {
    return fly.get<ResponseNullModel>('/api/weapp/usercenter/sendSms', { mobile })
  }

  // 提交绑定
  doBindMobile (data: BindFormModel) {
    return fly.get<ResponseNullModel>('/api/weapp/usercenter/bindMobile', data)
  }
}