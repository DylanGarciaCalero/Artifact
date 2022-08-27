import React from 'react'
import { Text, FlatList, Pressable, View, Image, ScrollView, Switch, TouchableOpacity, Modal, StyleSheet, ActivityIndicator} from 'react-native'
import Slider from '@react-native-community/slider'
import { auth } from '../../../firebase'
import { signOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import * as Location from 'expo-location';
import Logo from '../../../assets/logo/Logo.png'
import { useEffect } from 'react'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Checkbox from 'expo-checkbox';
import * as TaskManager from 'expo-task-manager';
import { Dimensions } from 'react-native';

import CustomButton from '../../components/CustomButton'
import CustomText from '../../components/CustomText'
import CustomInput from '../../components/CustomInput'
import Header from '../../components/Header'
import ArtifactsHeader from '../../components/ArtifactsHeader'
import Navigation from '../../components/Navigation'
import Entypo from 'react-native-vector-icons/Entypo'
import Divider from '../../components/Divider'
import RangeIndicator from '../../components/RangeIndicator'

const Discover = (props) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('')
    const [anonymous, setAnonymous] = useState(false)
    const [image, setImage] = useState('')
    const [chatRoom, setChatRoom] = useState(false)
    const [privateA, setPrivateA] = useState(false)
    const [location, setLocation] = useState({})
    const [loading, setLoading] = useState(true)
    const [hidden, setHidden] = useState(false)
    const [range, setRange] = useState(10)
    const [permission, setPermission] = useState(false)

    const windowHeight = Dimensions.get('window').height - 95;

    const toggleHidden = () => setHidden(previousState => !previousState)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            return;
            }
        })();
        getLocation()
    },[])

    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location)
        if (location) {
            setLoading(false)
        }
    }

    return (
        <View style={{flex: 1, height:"100%", width: "100%", paddingBottom: 80, backgroundColor: "white"}}>
            <ScrollView>
                <Image source={Logo} style={styles.logoHeader} resizeMode="contain"/>
                <View style={styles.createHeaderContainer}>
                    <View style={styles.createHeader}>
                    </View>
                </View>
                <View style={{height: windowHeight, width: "85%", alignSelf: "center", marginTop: -15, alignItems: "center", borderBottomColor: "orange", borderBottomWidth: 2, justifyContent: "center", position:"relative"}}>
                    { loading ? 
                        <ActivityIndicator color="orange"/>
                        :
                        <MapView
                            style={styles.map}
                            region={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude : location.coords.latitude , longitude : location.coords.longitude }}
                            />
                        </MapView>
                    }
                </View>
            </ScrollView>
            <Navigation props={props}/>
        </View>
    )
}

const styles = StyleSheet.create({
    createHeaderContainer: {
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        height: 40,
    },
    inputContainer: {
        width: "85%",
        alignSelf: "center",
        alignItems: "center",
        marginTop: -25,
    },
    logoHeader: {
        height: 50,
        alignSelf: "center",
        position: "absolute",
        top: 25,
        zIndex: 20,
    },
    createHeader: {
        width: "85%",
        height: "100%",
        backgroundColor: "#FEA024",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        padding: 10,
    },
    switchContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    innerSwitchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    switchPrivateContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    flexPrivate: {
        width: 90,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    passwordInputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    nextStep: {
        width: "85%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 30,
    },
    noticeContainer: {
        width: "100%",
        opacity: 0.5,
    },
    emojiContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 60,
    }, 
    noDisplayContainer: {
        display: "none",
    },
    disabled: {
        opacity: 0.3
    },
    map: {
        width: "100%",
        height: "100%",
    },
    wrapper: {
        width: "85%",
        alignSelf: "center",
        backgroundColor: "#f7f7eb",
        padding: 20,
    },
    unsetWrapper: {
        width: "85%",
        alignSelf: "center",
        padding: 20,
    },
    createArtifact: {
        width: "85%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 30,
    }
})

export default Discover