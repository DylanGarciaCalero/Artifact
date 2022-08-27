import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'

const RangeIndicator = ({range}) => {

    return (
        <View style={[styles.rangeIndicator, styles[`range_${range}`]]}>
        </View>
    )
}

const styles = StyleSheet.create({
    rangeIndicator: {
        backgroundColor: "#FEA024", 
        borderRadius: 250, 
        zIndex:1, 
        opacity: 0.3, 
        position: 'absolute', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    range_50: {
        width: 60,
        height: 60,
    },
    range_100: {
        width: 120,
        height: 120,
    },
    range_150: {
        width: 180,
        height: 180,
    }
})

export default RangeIndicator