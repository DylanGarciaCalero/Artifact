import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import CustomText from '../CustomText'
import { LinearGradient } from 'expo-linear-gradient'

const Divider = ({text}) => {

    return (
        <View style={styles.dividerContainer}>
            <LinearGradient
                colors={['#FEA024', 'transparent']}
                start={{x: 1, y: 0.5}}
                end={{x: 0, y: 0.5}}
                style={styles.divider}
            />
            <CustomText text={text} color="divider"/>
            <LinearGradient
                colors={['#FEA024', 'transparent']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.divider}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    dividerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        marginVertical: 10,
        width: "85%",
        alignSelf: "center",
    },
    divider: {
        flex: 1,
        alignSelf: "stretch",
        height: 3,
        marginVertical: 20,
        marginHorizontal: 10,
    }
})

export default Divider