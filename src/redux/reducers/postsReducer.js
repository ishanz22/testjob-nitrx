import { postsActionTypes, resetActionTypes, savePostActionTypes } from "../actionTypes/actionTypes";

const initialState = {

    postsLoading: false,
    postsSuccess: null,
    postsError: null,

    savePostLoading: false,
    savePostSuccess: null,
    savePostError: null
}

export default (state = initialState, action) => {
    switch (action.type) {

        case postsActionTypes.REQUEST_ACTION:
            return {
                ...state,
                postsLoading: true,
                postsSuccess: null,
                postsError: null
            }
        case postsActionTypes.SUCCESS_ACTION:
            return {
                ...state,
                postsLoading: false,
                postsSuccess: action.value.result,
                postsError: null
            }
        case postsActionTypes.FAILED_ACTION:
            return {
                ...state,
                postsLoading: false,
                postsSuccess: null,
                postsError: action.value.result
            }


            case savePostActionTypes.REQUEST_ACTION:
                return {
                  ...state,
                  savePostLoading: true,
                  savePostSuccess: null,
                  savePostError: null
                }
              case savePostActionTypes.SUCCESS_ACTION:
                return {
                  ...state,
                  savePostLoading: false,
                  savePostSuccess: action.value.result,
                  savePostError: null
                }
              case savePostActionTypes.FAILED_ACTION:
                return {
                  ...state,
                  savePostLoading: false,
                  savePostSuccess: null,
                  savePostError: action.value.result
                }
          
              case resetActionTypes.RESET_POST_ACTION:
                return {
                  ...state,
                  savePostLoading: false,
                  savePostSuccess: null,
                  savePostError: null
                }
              

        default:
            return state
    }
}
