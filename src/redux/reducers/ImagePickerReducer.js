import { imagePickerActionTypes, resetActionTypes} from '../actionTypes/actionTypes';

const initialState = {
    imageDataObject: null,
}


export default (state = initialState, action) => {
    switch (action.type) {
        case imagePickerActionTypes.SET_IMAGE:
            return {
                ...state,
                imageDataObject: action.value
            }

        case resetActionTypes.RESET_IMAGE_ACTION:
            return {
                ...state,
                imageDataObject: null,
            }

        default:
            return state;
    }
}
