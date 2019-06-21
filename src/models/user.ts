import { ResponseModel } from './response'

export interface UserModel {
  weappAccessToken: string
}

export interface UserResponseModel {
  loginUser: UserModel
  weappAccessToken: string
}

export interface UserProfileResponseModel extends ResponseModel<UserResponseModel> {}