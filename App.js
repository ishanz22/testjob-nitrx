import React, {Component, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/configurations/router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./src/redux/store/ConfigureStore";
import SplashScreen from 'react-native-splash-screen'

const App = () => {

    useEffect(()=>{
        setTimeout(()=>{
            SplashScreen.hide();
        },2000)
    },[])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Router />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default App;
