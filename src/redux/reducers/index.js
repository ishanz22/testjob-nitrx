import { combineReducers } from 'redux'
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";
import ImagePickerReducer from "./ImagePickerReducer";

export default combineReducers({
    authState: authReducer,
    postsState: postsReducer,
    imageState: ImagePickerReducer,
})
