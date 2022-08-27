import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'

const CustomText = ({ text, font, disabled, color, type, absolute}) => {

    return (
        <Text style={[styles.text, styles[`text_${font}`], disabled ? styles.disabled : '', absolute ? styles.absolute : '', styles[`text_${type}`], styles[`text_${color}`]]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        marginVertical: 5,
    },
    disabled: {
        opacity: 0.3,
    },
    text_roboto: {
        fontFamily: "RobotoSlab_400Regular"
    },
    text_montserrat: {
        fontFamily: "Montserrat_400Regular"
    },
    text_notice: {
        color: "#FEA024"
    },
    text_divider: {
        color: "#FEA024"
    },
    text_warning: {
        color: "red",
        fontSize: 12,
    },
    absolute: {
        position: "absolute",
        right: 0,
        bottom: 0,
        opacity: 0.3,
        fontSize: 12,
        paddingHorizontal: 15,
    }
})

export default CustomText