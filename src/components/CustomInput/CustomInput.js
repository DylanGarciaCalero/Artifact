import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import passwordEye from '../../../assets/icons/passwordEye.png'
import CustomText from '../CustomText'

const CustomInput = ({ absolute, name, value, setValue, placeholder, secureTextEntry, height, width, disabled, onBlur, onChangeText }) => {

    return (
        <View style={[styles.inputContainer, styles[`inputContainer_h${height}`], styles[`inputContainer_w${width}`]]}>
            { absolute  ? <CustomText absolute={true} text={absolute}/>: ''}
            <TextInput 
                name={name}
                multiline={height=='huge' ? true: false}
                value={value}
                onChangeText={setValue}
                style={styles.input} 
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                editable={disabled ? false : true}
                onBlur={onBlur}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "#C0F3D3",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
        marginVertical: 5,
    },
    inputContainer_hsmall: {
        height: 40
    },
    inputContainer_hmedium: {
        height: 60
    },
    inputContainer_hbig: {
        height: 80
    },
    inputContainer_hhuge: {
        height: 120
    },
    inputContainer_wsmall: {
        width: "50%"
    },
    inputContainer_wmedium: {
        width: "70%"
    },
    inputContainer_wbig: {
        width: "100%"
    },
    passwordHide: {
        position: 'absolute',
        right: 15,
        top: 6,
    },  
    input: {
        paddingTop: 2,
    },
})

export default CustomInput