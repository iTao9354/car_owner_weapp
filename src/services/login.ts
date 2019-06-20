import fly from '@/configs/fly'
import { WeappLoginResponseModel } from '@/models/login'

export class loginService {
  doWeappLogin (code: string) {
    return fly.get<WeappLoginResponseModel>('/api/weapp/account/codeLogin', { code })
  }
}