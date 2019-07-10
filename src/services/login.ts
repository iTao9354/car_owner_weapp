import { fly } from '@/configs/fly'
import { WeappLoginResponseModel } from '@/models/login'

export class loginService {
  doWeappLogin (code: string) {
    return fly.get<WeappLoginResponseModel>('/api/weapp/account/codeLogin', { code })
  }
  doDecrypt (encryptedData: string, iv: string) {
    return fly.post<WeappLoginResponseModel>('/api/weapp/account/decryptUserInfo', { encryptedData, iv })
  }
}