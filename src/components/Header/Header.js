import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import CustomText from '../CustomText'
import { auth } from '../../../firebase'
import Logo from '../../../assets/logo/Logo.png'
import GetUserName from '../GetUserName/GetUserName'

const Header = (props) => {

    console.log(props.props)

    return (
        <>
        <Image source={Logo} style={styles.logoHeader} resizeMode="contain"/>
        <View style={styles.headerContainer}>
            <View style={styles.headerLeft}>
                <CustomText text="Welcome" type="roboto"/>
            </View>
            <View style={styles.headerRight}>
                <TouchableOpacity style={{height: "100%", width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}} onPress={() => props.props.navigate("Profile")}>
                    <GetUserName/>
                </TouchableOpacity>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "center",
        height: 50,
    },
    logoHeader: {
        height: 50,
        alignSelf: "center",
        position: "absolute",
        top: 50,
        zIndex: 20,
    },
    headerLeft: {
        width: "45%",
        backgroundColor: "#C0F3D3",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        borderBottomEndRadius: 0,
        marginRight: -20,
    },
    headerRight: {
        width: "45%",
        backgroundColor: "#FEA024",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    }
})

export default Header