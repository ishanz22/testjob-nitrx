import {imagePickerActionTypes, resetActionTypes} from '../actionTypes/actionTypes';


export const setImagePickerAction = (data) => {
    return {
        type: imagePickerActionTypes.SET_IMAGE,
        value: data
    }
}

export const resetImageMessages = () => ({
    type: resetActionTypes.RESET_IMAGE_ACTION
})
