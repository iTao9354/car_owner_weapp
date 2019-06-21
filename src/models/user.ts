import { ResponseModel } from './response'

export interface UserModel {
  id: number
  name: string
  nickName?: string
  mobile?: string
  gender: number
  avatarUrl: string
  country: string
  province: string
  city: string
  language: string
  loginMode: string
}

export interface UserResponseModel {
  loginUser: UserModel
  weappAccessToken: string
}

export interface UserProfileResponseModel extends ResponseModel<UserResponseModel> {}