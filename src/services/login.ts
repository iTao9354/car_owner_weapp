import fly from '@/configs/fly'

export class loginService {
  doWeappLogin (code: string) {
    return fly.get('/api/weapp/account/codeLogin', { code })
  }
}