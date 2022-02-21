import { httpPost } from "../../services/httpServices";
import { signInUrl } from "../../configurations/urlConfigurations";
import {resetActionTypes, signInActionTypes} from "../actionTypes/actionTypes";

//network requests here

export const signInAction = (data) => {
  return httpPost({
    url: signInUrl,
    actionTypes: signInActionTypes,
    data
  })
}

export const resetAuthMessages = () => ({
  type: resetActionTypes.RESET_AUTH_ACTION
})
