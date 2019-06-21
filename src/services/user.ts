import fly  from '@/configs/fly'

export class UserService {
  getUserProfile () {
    return fly.get('/api/weapp/profile')
  }
}