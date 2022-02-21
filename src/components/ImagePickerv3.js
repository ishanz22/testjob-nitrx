import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// Import required components
import {Image, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
// Import Image Picker
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {setImagePickerAction} from '../redux/actions/ImagePickerActions'
import {backgroundColor, dimensions, greenColor} from "../constants";

const uploadIcon = null
// const uploadIcon = <Image source={require("../assets/images/camera.webp")}
//                           style={{
//                               width: 20 * 1.5,
//                               height: 20 * 1.3,
//                               transform: [{scale: 0.8}]
//                           }}/>


const ImagePickerv3 = () => {
    const dispatch = useDispatch();
    // const [filePath, setFilePath] = useState({});
    const [filePath, setFilePath] = useState(null);



    useEffect(() => {
        dispatch(setImagePickerAction(null))
    }, [])

    useEffect(() => {
        filePath && dispatch(setImagePickerAction((filePath)))
    }, [filePath]);


    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                console.log('2 Response = ', response);

                if (response.didCancel) {
                    // alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                // console.log('base64 -> ', response.base64);
                // console.log('uri -> ', response.uri);
                // console.log('width -> ', response.width);
                // console.log('height -> ', response.height);
                // console.log('fileSize -> ', response.fileSize);
                // console.log('type -> ', response.type);
                // console.log('fileName -> ', response.fileName);

                setFilePath(response);


            });
        }
    };

    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('2 launchImageLibrary ::  Response = ', response);

            if (response.didCancel) {
                // alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            // console.log('base64 *-> ', response.base64);
            // console.log('uri *-> ', response.uri);
            // console.log('width *-> ', response.width);
            // console.log('height *-> ', response.height);
            // console.log('fileSize *-> ', response.fileSize);
            // console.log('type *-> ', response.type);
            // console.log('fileName *-> ', response.fileName);
            setFilePath(response);
            // dispatch(addImagePickerAction(response))

        });
    };

    return (

        <View style={styles.container}>
            {/* <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        /> */}


            {/*<Image*/}
            {/*    source={{uri: filePath.uri}}*/}
            {/*    style={styles.imageStyle}*/}
            {/*/>*/}


            <View style={[styles.imagePicker,  {backgroundColor: (filePath  ? '#C3F0D7' : "#F8F8FF")}]}>
                <TouchableOpacity style={[styles.imagePicker,  {backgroundColor: (filePath  ? '#C3F0D7' : "#F8F8FF")}]} onPress={() => chooseFile('photo')}>

                   <Text style={styles.placeholder}>{filePath? 'Image has been Selected!': "Select media for post"}</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};

export default ImagePickerv3;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        borderColor: greenColor,
        justifyContent: 'center',
        alignSelf: 'center',
        height: 50,
        width: dimensions.widthLevel3 * 1.02,
        borderRadius: 10,
        marginTop: dimensions.heightLevel1,
    },

    buttonStyle: {
        alignItems: 'center',
        padding: 5,
        position: 'absolute',
        height: "100%",
        width: "100%",
        borderRadius: 500,
        justifyContent: 'center'

    },

    imagePicker: {
        width: "100%",
        height: "100%",
        backgroundColor:"#F8F8FF",
        borderRadius: 10,
        paddingHorizontal: dimensions.paddingLevel1 * 0.5,
        borderColor: backgroundColor,
        justifyContent: 'center',
    },

    placeholder: {
        color: 'rgba(0,0,0,0.4)'
    }
});
