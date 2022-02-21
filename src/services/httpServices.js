import { getConfigurations, handleDispatch, handleErrors } from "./httpConfig";
import axios from 'axios';

//http post request without tokens
export const httpPost = (requestConfig) => {

  const url = requestConfig.url;
  const actionTypes = requestConfig.actionTypes;
  const data = requestConfig.data;
  const isAuth = requestConfig.isAuth;
  const isFormData = requestConfig.isFormData;
  const timeout = requestConfig.timeout;

  return async(dispatch)=>{

    dispatch({ type: actionTypes.REQUEST_ACTION })

    const configurations = await getConfigurations('post',url,data,isAuth,isFormData,timeout);

    console.log(" : ", configurations)

    axios(configurations)
      .then((res)=>{
        console.log(res.data)
        if (res.status >= 400) {
          handleDispatch(dispatch,actionTypes.FAILED_ACTION,{code: 500, result: res.data})
        } else {
          handleDispatch(dispatch,actionTypes.SUCCESS_ACTION,{code: 200, result: res.data})
        }
      })
      .catch((error)=>{
        console.log(error)
        handleErrors(error,dispatch,actionTypes,{forceRequest: ()=>httpPost(requestConfig)});
      })
  }
}


//http get requests without tokens
export const httpGet = (requestConfig) => {

  const url = requestConfig.url;
  const actionTypes = requestConfig.actionTypes;
  const isAuth = requestConfig.isAuth;
  const isFormData = requestConfig.isFormData;
  const timeout = requestConfig.timeout;

  return async(dispatch)=>{

    dispatch({ type: actionTypes.REQUEST_ACTION })

    const configurations = await getConfigurations('get',url,null,isAuth,isFormData,timeout);

    axios(configurations)
      .then((res)=>{
        console.log(res.data)
        if (res.status < 300) {
          handleDispatch(dispatch,actionTypes.SUCCESS_ACTION,{code: 200, result: res.data})
        } else {
          handleDispatch(dispatch,actionTypes.FAILED_ACTION,{code: 500, result: res.data})
        }
      })
      .catch((error)=>{
        console.log(error)
        handleErrors(error,dispatch,actionTypes,{forceRequest: ()=>httpGet(requestConfig)});
      })
  }
}
