import React from 'react'
import { Text, FlatList, Pressable, View, Image, ScrollView, Switch, TouchableOpacity, Modal, StyleSheet, ActivityIndicator} from 'react-native'
import Slider from '@react-native-community/slider'
import { auth, db } from '../../../firebase'
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
import uuid from 'react-native-uuid'
import { ref, set } from "firebase/database"

import CustomButton from '../../components/CustomButton'
import CustomText from '../../components/CustomText'
import CustomInput from '../../components/CustomInput'
import Header from '../../components/Header'
import ArtifactsHeader from '../../components/ArtifactsHeader'
import Navigation from '../../components/Navigation'
import Entypo from 'react-native-vector-icons/Entypo'
import Divider from '../../components/Divider'
import RangeIndicator from '../../components/RangeIndicator'
import { date } from 'yup'

const CreateArtifactTwo = (props) => {
    const [location, setLocation] = useState({})
    const [loading, setLoading] = useState(true)
    const [hidden, setHidden] = useState(false)
    const [range, setRange] = useState(50)
    const [permission, setPermission] = useState(false)
    const [identifier, setIdentifier] = useState(false)

    const [permissionError, setPermissionError] = useState('')

    const toggleHidden = () => setHidden(previousState => !previousState)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            return;
            }
        })();
        setIdentifier(uuid.v4())
        getLocation()
    },[])

    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location)
        if (location) {
            setLoading(false)
        }
    }

    const validateAndCreate = () => {
        if (permission == false) {
            setPermissionError('You have to agree in order to create an artifact.')
        } else {
            setPermissionError('');
            createArtifact();
            // console.log(
            //     'identifier:', identifier,
            //     'title:',props.route.params.title,
            //     'message:', props.route.params.message,
            //     'user:', props.route.params.user,
            //     'anonymous:', props.route.params.anonymous,
            //     'image:', props.route.params.image,
            //     'chatroom:', props.route.params.chatroom,
            //     'private:', props.route.params.private,
            //     'chatPassword:', props.route.params.chatPassword,
            //     'latitude:', location.coords.latitude,
            //     'longitude:', location.coords.longitude,
            //     'range:', range,
            //     'public:', !hidden
            // )
        }
    }

    const createArtifact = () => {
        set(ref(db, 'artifacts/' + identifier), {
            id: identifier,
            title: props.route.params.title,
            message: props.route.params.message,
            user: props.route.params.user,
            anonymous: props.route.params.anonymous,
            image: props.route.params.image,
            chatroom: props.route.params.chatroom,
            private_chat: props.route.params.private,
            chatPassword: props.route.params.chatPassword,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            range: range,
            public_artifact: !hidden,
            created_at: Date.now(),
            likes: 0,
        }).then(
            set(ref(db, `users/${auth.currentUser.uid}/` + 'artifacts/created/' + identifier), {
                id: identifier
            })
        ).then(
            props.route.params.chatroom ? set(ref(db, `chatrooms/${identifier}`), {
                creator_id: auth.currentUser.uid
            }) : ''
        ).then(() => props.navigation.navigate("Home"))
    }

    return (
        <View style={{flex: 1, height:"100%", width: "100%", paddingBottom: 80, backgroundColor: "white"}}>
            <ScrollView>
                <Image source={Logo} style={styles.logoHeader} resizeMode="contain"/>
                <View style={styles.createHeaderContainer}>
                    <View style={styles.createHeader}>
                    </View>
                </View>
                <View style={{height: 300, width: "85%", alignSelf: "center", marginTop: -15, alignItems: "center", justifyContent: "center", position:"relative"}}>
                    { loading ? 
                        <ActivityIndicator color="orange"/>
                        :
                        <MapView
                            style={styles.map}
                            scrollEnabled={false}
                            zoomEnabled={false}
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
                    { loading ? <CustomText text="Loading your map"/> : <RangeIndicator range={range}/>}  
                </View>
                <Divider text="RANGE"/>
                <View style={styles.wrapper}>
                    <View style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                        <Slider
                            style={{flex: 1, height: 40}}
                            minimumValue={50}
                            maximumValue={150}
                            value={range}
                            step={50}
                            onValueChange={range => setRange( range )}
                        />
                        <View style={{ alignSelf:"center", width: "13%"}}>
                            <CustomText text={range+'m'} font="roboto"/>
                        </View>
                    </View>
                    <CustomText text="Select a range in which your Artifact will be visible." font="montserrat"/>
                </View>
                <Divider text="VISIBILITY"/>
                <View style={styles.wrapper}>
                    <View style={{flexDirection: "row", justifyContent:"space-between", alignItems:"center"}}>
                        <CustomText text={ hidden ? "Hidden" : "Public"}/>
                        <Switch
                            trackColor={{ false: "#767577", true: "#C0F3D3" }}
                            thumbColor={hidden ? "#FEA024" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleHidden}
                            value={hidden}
                        />
                    </View>
                    <View style={{width: "85%", alignSelf:"center"}}>
                        {
                            hidden ?
                            <>
                                <CustomText text="People will not be able to see your Artifact on their discovery map. Only when in range, the content will reveal itself." font="montserrat"/>
                            </>
                            : 
                            <>
                                <CustomText text="People will see this Artifact on their discovery map. The content however will only reveal itself when in range." font="montserrat"/>
                            </>
                        }
                    </View>
                </View>
                <View style={styles.unsetWrapper}>
                    <View style={{flexDirection: "row", alignItems:"center", width: "100%", justifyContent:"space-between"}}>
                        <View style={{width: "80%"}}>
                            <CustomText text="I understand that this Artifact will be placed on this exact location" font="montserrat"/>
                        </View>
                        <Checkbox
                            style={{borderWidth: 1, padding: 10}}
                            value={permission}
                            onValueChange={setPermission}
                            color={permission ? '#FEA024' : undefined}
                        />
                    </View>
                    { permissionError !== '' ? <Text style={styles.error}>{permissionError}</Text> : ''}
                </View>
                <View style={styles.createArtifact}>
                    <CustomButton onPress={() => props.navigation.goBack()} text="Previous" type="outline" size="half"/>
                    <CustomButton onPress={() => validateAndCreate()} text="Create Artifact" type="primary" size="half"/>
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
    },
    error: {
        alignSelf: 'flex-end', 
        color: 'red',
        fontSize: 12,
        marginBottom: 4,
    }
})

export default CreateArtifactTwo