import { SET_USER } from '@/constants/user'
import { UserModel } from '@/models/user'

export const setUserAction = (user: UserModel) => {
  return {
    type: SET_USER,
    user
  }
}