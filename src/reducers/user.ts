import { SET_USER } from '@/constants/user'

const INITIAL_STATE = {}
export default function userReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.user
      }
      break
    default:
      return state
  }
}