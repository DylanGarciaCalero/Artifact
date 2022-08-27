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
import { useList, useObjectVal } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database'
import AntDesign from 'react-native-vector-icons/AntDesign'

import CustomButton from '../../components/CustomButton'
import CustomText from '../../components/CustomText'
import CustomInput from '../../components/CustomInput'
import Header from '../../components/Header'
import ArtifactsHeader from '../../components/ArtifactsHeader'
import Navigation from '../../components/Navigation'
import Entypo from 'react-native-vector-icons/Entypo'
import Divider from '../../components/Divider'
import RangeIndicator from '../../components/RangeIndicator'
import moment from 'moment'

const GetArtifactsDataById = ({id, navigation, index}) => {
    const [value, loading, error] = useObjectVal(ref(db, `artifacts/${id}`));

    const goToArtifactsDetail = (value) => {
        navigation.navigate('ArtifactsDetail', {
            data: value
        })
    }

    if (loading) {
        return (<Text>Loading</Text>)
    } else if (value) {
        return (
            <TouchableOpacity onPress={() => goToArtifactsDetail(value)}>
                <View style={styles.synopsisItem}>
                    <View style={styles.content}>
                        <CustomText text={value.title} font="roboto"/>
                        <CustomText text={value.message} font="montserrat"/>
                    </View>
                    <View style={styles.extraContent}>
                        <View style={styles.heartContainer}>
                            { value.likes == 0 ? '' : 
                                <CustomText text={value.likes}/>
                            }
                            <AntDesign name="hearto" size={22} style={styles.icon}/>
                        </View>
                        <View style={styles.timeContainer}>
                            <CustomText text={moment(value.created_at).fromNow()}/>
                            <Entypo name="back-in-time" size={24} style={styles.icon}/>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
         )
    }
}

const styles = StyleSheet.create({
    synopsisItem: {
        height: 80,
        width: "100%",
        backgroundColor: 'orange',
        marginBottom: 4,
        padding: 12,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center",
        borderRadius: 16,
    },
    content: {
        flexDirection: "column"
    },
    timeContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    heartContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    extraContent: {
        flexDirection: "column",
        alignItems: "flex-end"
    },
    icon: {
        marginLeft: 6,
    },
})

export default GetArtifactsDataById