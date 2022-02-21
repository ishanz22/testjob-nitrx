import React, {useEffect} from 'react';
import {View} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {useNavigation} from "@react-navigation/native";

const WelcomeScreen = () => {

    const navigation = useNavigation();

    useEffect(()=>{
        async function getToken() {
            if (await AsyncStorage.getItem('token')) {
                navigation.reset({index: 0, routes: [{ name: 'home' }]});
            } else {
                navigation.reset({index: 0, routes: [{ name: 'login' }]});
            }
        }
        getToken();
    },[])

    return (
        <View></View>
    )
}

export default WelcomeScreen;
