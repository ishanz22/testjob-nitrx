import React from 'react';
import {ActivityIndicator, Dimensions, View, StyleSheet} from "react-native";

const {width,height} = Dimensions.get('window');

const Loader = ({isVisible}) => (
    isVisible ?
        <View style={styles.container}>
            <ActivityIndicator size={"large"} />
        </View> : null
)

const styles = StyleSheet.create({
    container: {
        backgroundColor:'rgb(255,255,255)',
        opacity: .8,
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: height,
        elevation: 20
    }
})

export default Loader;
