import React, {useEffect} from 'react';
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TextInput from '../components/TextInput';
import {backgroundColor} from "../constants";
import {useNetInfo} from "@react-native-community/netinfo";
import {useDispatch, useSelector} from "react-redux";
import {resetPostMessages, savePostAction} from "../redux/actions/postsActions";
import {resetImageMessages} from "../redux/actions/ImagePickerActions";
import {showToast} from "../configurations/ToastConfig";
import Loader from "../components/Loader";
import ImagePicker from "../components/ImagePicker";
import AsyncStorage from "@react-native-community/async-storage";

const CreatePostScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const netInfo = useNetInfo();

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [website, setWebsite] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [mediaFile, setMediaFile] = React.useState(null);

    const savePostSuccess = useSelector(state => state.postsState.savePostSuccess);
    const savePostLoading = useSelector(state => state.postsState.savePostLoading);
    const savePostError = useSelector(state => state.postsState.savePostError);

    useEffect(() => {
        if (netInfo?.isConnected) {
            async function checkLocalStoreAndUpload() {
                const localStore = await AsyncStorage.getItem('LOCAL_DATA');
                if (localStore) {
                    const list = JSON.parse(localStore);
                    console.log(list)
                    list.map(data => {
                        uploadPostData(data);
                    })
                    await AsyncStorage.removeItem('LOCAL_DATA');
                }
            }

            checkLocalStoreAndUpload();
        } else {
            if (netInfo?.isConnected?.toString() === 'false') {
                showToast({code: -1, result: 'You are offline!'});
            }
        }
    }, [netInfo]);

    useEffect(() => {
        if (savePostSuccess) {
            showToast({code: 203, result: 'Post created successfully!'});
            dispatch(resetPostMessages());
            dispatch(resetImageMessages());
            navigation.navigate('home');
        } else if (savePostError) {
            showToast({code: 500, result: "Failed to create the post!"});
            dispatch(resetPostMessages());
        }


    }, [savePostSuccess, savePostError]);

    const storeLocalData = async (data) => {
        const localData = await AsyncStorage.getItem('LOCAL_DATA');
        if (!localData) {
            const list = JSON.stringify([data]);
            await AsyncStorage.setItem('LOCAL_DATA', list);
        } else {
            const list = JSON.parse(localData);
            list.push(data);
            await AsyncStorage.setItem('LOCAL_DATA', JSON.stringify(list));
        }
        showToast({code: -1, result: 'No internet! Post Saved Locally'});
        navigation.navigate('home');
    }

    const uploadPostData = (data) => {
        dispatch(savePostAction(data));
    }

    const PostButtonHandler = () => {
        if (title && description && category && website && mediaFile) {
            let data = {
                title: title,
                description: description,
                category: category,
                website: website,
                mediaFile: mediaFile,
            };

            // if online will send
            if (netInfo?.isConnected) {
                uploadPostData(data);

                // if offline local save
            } else {
                storeLocalData(data);
            }
        }
    }


    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>

                    <Image
                        style={{width: 17, height: 17, marginTop: '17%', marginRight: '80%'}}
                        source={require("../assets/back.png")}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 25,
                    position: 'absolute',
                    paddingTop: 5,
                    color: '#088F8F',
                    fontWeight: 'bold'
                }}> Create Post</Text>
                <View style={{flex: 2, flexDirection: 'row', padding: '2%',}}>

                    <View style={{flex: 1, alignItems: 'flex-start', paddingTop: 15, marginHorizontal: 15}}>
                    </View>

                </View>

                <View style={{flexDirection: 'row', width: '100%', height: '65%'}}>

                    <View style={{flex: 1}}>

                        <FlatList
                            horizontal={true}

                            style={{}}
                            data={[]}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString() + item.toString()}
                            contentContainerStyle={{paddingRight: 300}}
                            ListHeaderComponentStyle={{justifyContent: 'center'}}

                            renderItem={({item, index}) => (
                                <View style={{
                                    alignItems: 'center',
                                    padding: '2.5%',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}>
                                    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 5}}>
                                        <Image
                                            source={item.image}
                                        />
                                        <Image
                                            source={require("../assets/Gradient.png")}
                                            style={{position: "absolute",}}
                                        />
                                    </View>
                                    <Text style={{fontFamily: "SF-UI-Text-Medium", fontSize: 11, paddingTop: '1.5%'}}>
                                        {item.name}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>

                </View>

            </View>


            <ScrollView style={styles.content}>
                <View style={{height: 450, marginBottom: 10, marginTop: -450}}>
                    <View style={{height: 50, justifyContent: 'space-between', flexDirection: 'row'}}>
                    </View>
                </View>

                <View style={styles.baseForm}>
                    <View style={styles.textinput}>
                        <TextInput
                            placeholder={'Title'}
                            onChangeText={(data) => setTitle(data)}
                            value={title}
                        />
                        <TextInput
                            placeholder={'Category'}
                            onChangeText={(data) => setCategory(data)}
                            value={category}
                        />
                        <TextInput
                            placeholder={'Website'}
                            onChangeText={(data) => setWebsite(data)}
                            value={website}
                        />

                        <ImagePicker
                            // defImage={userSuccess && userSuccess.result ? userSuccess.result.profileLogoUrl : null}
                            onCaptureImage={(data) => {
                                if (data) {
                                    setMediaFile({
                                        name: data.fileName,
                                        type: data.type,
                                        uri: data.uri
                                    })
                                }
                            }}/>

                        <TextInput
                            placeholder={'Description'}
                            onChangeText={(data) => setDescription(data)}
                            value={description}
                        />

                        <View style={styles.menuItem}>

                        </View>

                        <TouchableOpacity onPress={() => {
                            PostButtonHandler();
                        }}>

                            <View style={styles.buttonRegister}>
                                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15}}>Post Now</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>


                <View style={{height: 60}}></View>
            </ScrollView>

            <Loader isVisible={savePostLoading}/>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: '10%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
    },
    bottomNav: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: '7.5%',
        flex: 5,
        flexDirection: 'row',
        elevation: 2,
        backgroundColor: 'white',
        borderTopWidth: 0.2
    },
    content: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 20,
        marginBottom: '2%'
    },
    textinput: {
        paddingHorizontal: 10,
        paddingTop: 15
    },
    menuItem: {
        paddingTop: 30,
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginLeft: -25,
    },
    menuItemText: {
        alignItems: 'flex-start',
        color: '#808080',
        paddingTop: 5,
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 26,

    },
    buttonRegister: {
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#088F8F',
        marginTop: 0,
        marginHorizontal: 70
    },

    imagePicker: {
        width: '100%',
        backgroundColor: "#F8F8FF",
        borderRadius: 10,
        paddingHorizontal: 12,
        borderColor: backgroundColor,
    },

});

export default CreatePostScreen;
