import React, { useEffect } from 'react'
import { Text, FlatList, Pressable, View, Image, ScrollView, Switch, TouchableOpacity, Modal, StyleSheet, ActivityIndicator} from 'react-native'
import CustomText from '../../components/CustomText'
import { db, auth } from '../../../firebase'
import { ref } from 'firebase/database'
import { useObjectVal } from 'react-firebase-hooks/database'

const GetUserById = (props) => {
    const [value, loading, error] = useObjectVal(ref(db, `users/${auth.currentUser.uid}`));

    if (loading) { 
        return <Text>Loading</Text> 
    } else {
        return (
            <CustomText text={'Created by '+value.username}/>
        )
    }
}

const styles = StyleSheet.create({

})

export default GetUserById