import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image, Button, Pressable, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Custombutton = ({ onPress, text, type, size, Icon, height }) => {

    return (
        <TouchableOpacity onPress={onPress} style={[styles.inputContainer, styles[`inputContainer_${type}`], styles[`${size}`],styles[`inputContainer_h${height}`]]}>
            { 
            Icon ? 
            <AntDesign name={Icon} color="black" size={20}/> : 
            <Text style={[styles.button, styles.margin, styles[`button_${type}`], styles[`button_${size}`], styles[`h${height}`]]}>{text}</Text>
            }
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    inputContainer: {
            width: "70%",
            height: 40,
            paddingHorizontal: 10,
            borderRadius: 10,
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center',
    },
    inputContainer_hbig: {
        height: 80
    },
    inputContainer_primary: {
        backgroundColor: "#FEA024",
    },
    inputContainer_secondary: {
        backgroundColor: "#D4A569",
        opacity: 0.8,
    },
    inputContainer_tertiary: {
        backgroundColor: "black",
    },
    inputContainer_outline: {
        borderWidth: 2,
        borderColor: "#FEA024",
    },
    button: {
        fontFamily: 'RobotoSlab_600SemiBold',
    },
    button_tertiary: {
        color:'white',
        fontSize: 12,
        textAlign: 'center'
    },
    small: {
        width: 60,
        height: 40,
    },
    half: {
        width: '40%',
        marginHorizontal: 5,
    },
    full: {
        width: '100%',
        marginHorizontal: 5,
    },
    button_half: {
        fontSize: 12,
        textAlign: 'center',
    },
    button_secondary: {
        color:'white',
        textAlign: 'center'
    }
})

export default Custombutton