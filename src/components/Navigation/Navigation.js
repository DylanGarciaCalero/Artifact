import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import CustomText from '../CustomText'
import CustomButton from '../CustomButton'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'
import Logo from '../../../assets/logo/Logo.png'
import { StatusBar } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import Home from '../../../assets/icons/HomeNavigation.png'
import Artifact from '../../../assets/icons/ArtifactNavigation.png'
import Discover from '../../../assets/icons/DiscoverNavigation.png'
import User from '../../../assets/icons/UserNavigation.png'

const Navigation = ({props, route}) => {

    const goHome = () => {
        props.navigation.navigate("Home")
    }

    const goDiscover = () => {
        props.navigation.navigate("Discover")
    }

    const goArtifacts = () => {
        props.navigation.navigate("Artifacts", {
            selected: 'created'
        })
    }

    return (
        <>
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={goArtifacts}>
                    <Image style={styles.navigationItem} resizeMode="contain" source={Artifact}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={goHome} >
                    <Image style={styles.navigationItem} resizeMode="contain" source={Home}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={goDiscover}>
                    <Image style={styles.navigationItem} resizeMode="contain" source={Discover}/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    navigationContainer: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-evenly",
        bottom: 0,
        alignSelf: "center",
        width: "100%",
        height: 40,
        marginBottom: 20,
        borderRadius: 20,
    },
    navigationItem: {
        width: 30,
        height: 35,
    },
})

export default Navigation