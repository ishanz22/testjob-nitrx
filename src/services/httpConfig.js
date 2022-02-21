import AsyncStorage from '@react-native-community/async-storage';
import { apiBaseUrl } from "../configurations/urlConfigurations";

const timeout = 25000;

export const handleDispatch = (dispatch,actionType,data) => {
  dispatch({
    type: actionType,
    value: data
  })
}

//use to handle the errors like timeout, session expirations and token refresh parts
export const handleErrors = async(error,dispatch,actionTypes,previousRequest) => {

  if (error.code === 'ECONNABORTED') {
    handleDispatch(dispatch, actionTypes.FAILED_ACTION, { code: 500, result: 'Request Timeout!' });

  } else if (!error || !error.response) {
    handleDispatch(dispatch,actionTypes.FAILED_ACTION,{code: 500, result: 'Something went wrong!'});

  } else if (error.response.status === 401) {

  } else {
    handleDispatch(dispatch,actionTypes.FAILED_ACTION,{code: 500, result: 'Something went wrong!'});
  }
}

//use to get the request headers and other axios configurations
export const getConfigurations = async(httpMethod,url,data,isAuth,isFormData,givenTimeout) => {

  let headers = {
    'Accept': 'application/json',
    'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
  }

  if (isAuth) {
    headers = {
      ...headers,
      'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
    }
  }

  return {
    headers,
    data,
    url,
    baseURL: apiBaseUrl,
    timeout: givenTimeout ? givenTimeout : timeout,
    method: httpMethod
  }
}
