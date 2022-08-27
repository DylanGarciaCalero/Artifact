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
import { Dimensions } from 'react-native';
import { useList } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database'

import CustomButton from '../../components/CustomButton'
import CustomText from '../../components/CustomText'
import CustomInput from '../../components/CustomInput'
import Header from '../../components/Header'
import ArtifactsHeader from '../../components/ArtifactsHeader'
import Navigation from '../../components/Navigation'
import Entypo from 'react-native-vector-icons/Entypo'
import Divider from '../../components/Divider'
import RangeIndicator from '../../components/RangeIndicator'
import GetArtifactsDataById from '../../components/GetArtifactsDataById'

const Artifacts = (props) => {
    const [selected, setSelected] = useState('created')
    const [snapshotsCreated, loadingCreated, errorCreated] = useList(ref(db, `users/${auth.currentUser.uid}/artifacts/created`));
    const [snapshotsFound, loadingFound, errorFound] = useList(ref(db, `users/${auth.currentUser.uid}/artifacts/found`));

    useEffect(() => {
        if (props.route.params.selected) {
            setSelected(props.route.params.selected)
        }
    }, [])

    return (
        <View style={{flex: 1, height:"100%", width: "100%", paddingBottom: 80, backgroundColor: "white", paddingTop: 35}}>
            <View style={styles.headerContainer}>
                <View style={[styles.headerLeft, selected == 'created' ? styles.selected : '']}>
                    <TouchableOpacity onPress={() => setSelected('created')}>
                        <CustomText text={snapshotsCreated.length +' Created'} type="roboto"/>
                    </TouchableOpacity>
                </View>
                
                <View style={[styles.headerLeft, selected == 'found' ? styles.selected : '']}>
                    <TouchableOpacity onPress={() => setSelected('found')}>
                        <CustomText text={snapshotsFound.length + ' Found'} type="roboto"/>
                    </TouchableOpacity>
                </View>
            </View>
              <View style={{width: "85%", height: 300, marginTop: 8, justifyContent: snapshotsCreated.length == 0 ? "center" : "flex-start", alignItems: snapshotsCreated.length == 0 ? "center" : "flex-start", alignSelf: 'center', display: selected == 'created' ? 'flex' : 'none'}}>
                    { snapshotsCreated.length !== 0 ? <CustomText text="Your created Artifacts:" font="montserrat"/> : ''}
                    { snapshotsCreated.length !== 0 ? 
                        <FlatList
                            style={{width: "100%", marginTop: 8}}
                            data={snapshotsCreated}
                            keyExtractor={(item) => item.val().id}
                            renderItem={({item, index}) => 
                                <GetArtifactsDataById index={index} id={item.val().id} navigation={props.navigation}/>
                            }
                        /> : 
                        <>
                            <CustomText text="No Artifacts created yet"/>
                            <CustomButton text="Create your first Artifact!" type="primary" onPress={() => props.navigation.navigate("CreateArtifact")}/>
                        </>
                    }
              </View>
              <View style={{width: "85%", height: 300, marginTop: 8, alignSelf: 'center', display: selected == 'found' ? 'flex' : 'none'}}>
                    <CustomText text="Your found Artifacts:" font="montserrat"/>
                    { snapshotsFound.length !== 0 ? 
                        <FlatList
                            style={{width: "100%", marginTop: 8}}
                            data={snapshotsFound}
                            keyExtractor={(item) => item.id}
                            renderItem={({item, index}) => 
                                <GetArtifactsDataById index={index} id={item.val().id} navigation={props.navigation}/>
                            }
                        /> : 
                        <View style={{alignSelf: "center", marginTop: 30}}>
                            <CustomText text="No Artifacts found yet" font="montserrat"/>

                        </View>
                    }
              </View>
            <Navigation props={props}/>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#C0F3D3",
        height: 60,
        width: "85%",
        maxWidth: "85%",
        alignSelf: "center",
        borderRadius: 20,
    },
    headerLeft: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        padding: 10,
    },
    headerRight: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        padding: 10,
    },
    selected: {
        backgroundColor: "orange",
        width: "60%",
        borderRadius: 15,
    }
})

export default Artifacts