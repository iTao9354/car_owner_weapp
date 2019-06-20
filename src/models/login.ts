import { ResponseModel } from './response'
import { UserResponseModel } from './user'

export interface WeappLoginResponseModel extends ResponseModel<UserResponseModel> {}