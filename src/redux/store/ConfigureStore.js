import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from '../reducers';

const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
    blacklist: ['authState']
};

const middleWares = [thunk];
const enhancer = applyMiddleware(...middleWares);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore( persistedReducer, enhancer )

let persistor = persistStore(store);

export {
    store,
    persistor,
};
