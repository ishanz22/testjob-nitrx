import React, {useEffect, useState} from 'react';
import {View, Image, Text, StyleSheet, Keyboard} from 'react-native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Loader from "../components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {resetAuthMessages, signInAction} from "../redux/actions/authActions";
import AsyncStorage from "@react-native-community/async-storage";
import Snackbar from 'react-native-snackbar';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () =>{

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const signInLoading = useSelector(state => state.authState.signInLoading);
    const signInError = useSelector(state => state.authState.signInError);
    const signInSuccess = useSelector(state => state.authState.signInSuccess);

    const [username,setUserName] = useState(null);
    const [password,setPassword] = useState(null);

    // user login function
    const userLogin = () => {
        if (username && password) {
            dispatch(signInAction({username,password}))
            Keyboard.dismiss();
        }
    }

    // use effect for check the login status
    useEffect(()=>{
        if (signInSuccess) {
            AsyncStorage.setItem('token',signInSuccess.access);
            navigation.reset({index: 0, routes: [{ name: 'home' }]});
        }
        if (signInError) {
            Snackbar.show({
                text: 'Invalid Credentials!',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red'
            });
        }
        dispatch(resetAuthMessages());

    },[signInSuccess,signInError])

    return (
          <View style={styles.container}>
            <Image
                style={{ marginTop: 42, marginBottom: 32 }}
                source={require('../assets/logo3.png')}
            />

            {/*title*/}
            <Text style={{ fontSize: 35, color: '#088F8F' }}>Login</Text>

            {/* Input Form */}
            <View style={styles.baseForm}>
              <TextInput
                  placeholder={'Username'}
                  onChangeText={(text)=>setUserName(text)}
              />
              <TextInput
                  placeholder={'Password'}
                  spyMode
                  onChangeText={(text)=>setPassword(text)}
              />

              {/*login button*/}
              <View style={{ marginTop: 70 }}>
                <Button
                    title="LOGIN"
                    onPress={userLogin}
                />
              </View>

            </View>

            <Loader isVisible={signInLoading}/>

          </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  baseForm: {
    paddingTop: 10,
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 54,
    paddingHorizontal: 16,
  },
});



export default LoginScreen;
