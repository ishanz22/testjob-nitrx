import {httpGet, httpPost} from "../../services/httpServices";
import {postsUrl, savePostUrl} from "../../configurations/urlConfigurations";
import {postsActionTypes, resetActionTypes, savePostActionTypes} from "../actionTypes/actionTypes";

//network requests here

export const getAllPosts = () => {
    return httpGet({
        isAuth: true,
        url: postsUrl,
        actionTypes: postsActionTypes
    })
}

export const savePostAction = (data) => {

    // let media = data.mediaFile && ({
    //   uri: data.mediaFile.assets[0].uri,
    //   name: data.mediaFile.assets[0].fileName,
    //   type: data.mediaFile.assets[0].type
    // })


    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("website", data.website);
    formData.append("media_list",  data.mediaFile);
    formData.append("description", data.description);

    console.log("==================")
    console.log(formData)
    console.log("==================")

    return httpPost({
      url: postsUrl,
      actionTypes: savePostActionTypes,
      isFormData: true,
      data: formData,
      isAuth: true,
    })
  }

  export const resetPostMessages = () => ({
    type: resetActionTypes.RESET_POST_ACTION
  })

