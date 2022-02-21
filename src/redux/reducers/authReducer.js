import {resetActionTypes, signInActionTypes} from "../actionTypes/actionTypes";

const initialState = {

  signInLoading: false,
  signInSuccess: null,
  signInError: null
}

export default (state = initialState, action) => {
  switch (action.type) {

    case signInActionTypes.REQUEST_ACTION:
      return {
        ...state,
        signInLoading: true,
        signInSuccess: null,
        signInError: null
      }
    case signInActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        signInLoading: false,
        signInSuccess: action.value.result,
        signInError: null
      }
    case signInActionTypes.FAILED_ACTION:
      return {
        ...state,
        signInLoading: false,
        signInSuccess: null,
        signInError: action.value.result
      }

    case resetActionTypes.RESET_AUTH_ACTION:
      return {
        ...state,
        signInLoading: false,
        signInSuccess: null,
        signInError: null
      }

    default:
      return state
  }
}
