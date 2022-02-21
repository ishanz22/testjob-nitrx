import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity, Linking
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {mediaBaseUrl} from "../configurations/urlConfigurations";
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {getAllPosts} from "../redux/actions/postsActions";
import Loader from "../components/Loader";
import Snackbar from "react-native-snackbar";

const HomeScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const postsLoading = useSelector(state => state.postsState.postsLoading);
    const postsSuccess = useSelector(state => state.postsState.postsSuccess);
    const postsError = useSelector(state => state.postsState.postsError);

    const [data,setData] = useState([]);

    // posts get request will happen here
    useEffect(()=>{
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getAllPosts());
        });
        return unsubscribe;
    },[])

    useEffect(()=>{
        if (postsSuccess && postsSuccess.results && postsSuccess.results.length) {
            setData(postsSuccess.results);
        }
        if (postsError) {
            Snackbar.show({
                text: 'Something went wrong!',
                duration: Snackbar.LENGTH_LONG,
                backgroundColor: 'red'
            });
        }
    },[postsSuccess,postsError])

    const cardItem = ({item}) =>
        <View>
            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center', padding: '7.5%'}}>
                        <Image
                            source={{uri: mediaBaseUrl +item.creator_details.avatar}}
                            style={{borderRadius: 200,width: 40,height: 40}}
                        />
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={{fontFamily: "SF-UI-Text-Medium", fontSize: 12}}>
                            {item.creator_details.name}
                        </Text>
                        <Text style={{fontFamily: "SF-UI-Text-Regular", fontSize: 11}}>
                            {moment.unix(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.postImgContainer}>
                <Image
                    source={{uri: mediaBaseUrl +item.materials[0].media_file}}
                    style={styles.postImg}
                />

                <View style={{marginTop: 20,width: '95%'}}>
                    <View style={{flexDirection: 'row'}}>

                        <View style={{flexDirection: 'row', flex: 2}}>
                            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
                                <Icon name="heart-o" size={20} color="gray" />
                            </TouchableOpacity>

                            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
                                <Icon name="thumbs-o-up" size={20} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <View style={{flex: 6,alignItems: 'flex-end'}}>
                            <View style={{marginRight: '5%',flexDirection: 'row'}}>
                                {
                                    [1,2,3,4,5].map((stars,index)=>(
                                        <Icon key={index} name={parseInt(item.rated_value) > 0 && parseInt(item.rated_value) <= index ? "star" : "star-o"} size={20} color="gray" />
                                    ))
                                }
                                <Text style={{fontSize: 15,marginLeft: '5%'}}>{item.rated_value ? item.rated_value : 0}/5</Text>
                            </View>
                        </View>

                    </View>

                    <Text numberOfLines={1} style={styles.description}>
                        {item.description}
                    </Text>

                    {
                        item.website ?
                            <Text
                                style={[styles.description,{color: 'blue'}]}
                                onPress={()=>Linking.openURL(item.website)}
                            >
                                {item.website}
                            </Text> : null
                    }
                </View>
            </View>
        </View>


    return (

        <View style={{flex: 1,backgroundColor: 'white'}}>

            <View style={styles.header}>
                <Text style={styles.headerText}> Nitrx </Text>
            </View>

            <View style={{flex: 10}}>

                {
                    data && data.length ?
                        <FlatList
                            style={{flex: 1}}
                            data={data}
                            renderItem={cardItem}
                            keyExtractor={item => item.id}
                        /> : null
                }

            </View>

            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('createPost')
                }}>

                    <Image
                        style={{width: 40, height: 40, marginBottom: 15, alignSelf: 'center'}}
                        source={require("../assets/plus.png")}
                    />
                </TouchableOpacity>
            </View>

            <Loader isVisible={postsLoading}/>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 2,
    },
    headerText: {
        fontSize: 25,
        position: 'absolute',
        paddingTop: 5,
        color: '#088F8F',
        fontWeight: 'bold'
    },
    description: {
        marginTop: 20,
        fontFamily: "SF-UI-Text-Bold",
        fontSize: 12,
        paddingBottom: '0.5%',
        marginLeft: '2%'
    },
    postImgContainer: {
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    postImg: {
        width: '95%',
        height: 200,
        borderRadius: 10
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
    }

});

export default HomeScreen;
