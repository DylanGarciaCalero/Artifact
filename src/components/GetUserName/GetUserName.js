import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import CustomText from '../CustomText'
import { auth, db } from '../../../firebase'
import { ref, get, child} from "firebase/database";

const GetUserName = (props) => {
    const [username, setUsername] = useState('')

    const dbRef = ref(db);
    get(child(dbRef, `users/${auth.currentUser.uid}`)).then((snapshot) =>{
        if (snapshot.exists()) {
            setUsername(snapshot.val().username)
        } else {
            console.log("No data available")
        }
    }).catch((error) => {
        console.error(error);
    })

    return (
        <>
            <CustomText text={username} font="roboto"/>
        </>
    )
}

const styles = StyleSheet.create({

})

export default GetUserName