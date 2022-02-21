import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput as Input,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {greenColor} from '../constants';
import { backgroundColor } from '../constants';

const TextInput = (props) =>{

    const [hidePassword,setHidePassword] = useState(props.spyMode);
    const [isFocus,setIsFocus] = useState(false);

    useEffect(()=>{

    },[])

    const showHidePassword = () => {
        const icoImage = !hidePassword ? 'eye' : 'eye-slash';
        return (
            <View style={{position: 'absolute', end: 0, top: 32}}>
                <TouchableOpacity
                    onPress={() => setHidePassword(!hidePassword)}>
                    <Icon
                        style={{marginEnd: 12}}
                        name={icoImage}
                        size={24}
                        color="#20B2AA"
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const {errorMsg, onChangeText, placeholder, spyMode} = props;

    return (
        <View>
            <Text
                style={{
                    color: greenColor,
                    fontSize: 12,
                    marginStart: 12,
                    marginBottom: 4,

                }}>
                {errorMsg}
            </Text>
            <Input

                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={hidePassword}
                style={[styles.inputForm, {borderWidth: isFocus ? 2 : 1}]}

            />
            {spyMode && showHidePassword()}
        </View>
    );
}

const styles = StyleSheet.create({
  inputForm: {
    backgroundColor:"#F8F8FF",
    borderRadius: 10,
    paddingHorizontal: 12,
    color: "#000000",
    borderColor: backgroundColor,
  },
});

export default TextInput;
