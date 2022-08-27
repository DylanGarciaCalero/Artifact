import React, { useState } from 'react';
import { Text, FlatList, Pressable, View, Button, TextInput, Image, StyleSheet, ImageBackground, ScrollView, Touchable } from 'react-native';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import GeoFencing from '../../components/GeoFencing';
import Notification from '../../components/Notification';

// Form Components
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

// Images
import Logo from '../../../assets/logo/Logo.png'
import BackGroundImage from '../../../assets/background/BackGroundImage.png'
import { auth, db } from '../../../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../../components/CustomText';

const Profile = (props) => {

    const [editProfile, setEditProfile] = useState(false)

    const logOut = async () => {
        try {
            await auth.signOut().then(() => props.navigation.navigate("Login"))
        } catch (err) {
            console.error(err)
        }
    }

    return (
    <>
        <Text style={{marginTop: 200}}>User profile</Text>
        <TouchableOpacity onPress={logOut}>
            <CustomText text="Logout"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setEditProfile(true)}>
            <CustomText text="Edit profile"/>
        </TouchableOpacity>
        <View style={{display: editProfile ? 'flex' : 'none'}}>
            <CustomText text="Edit your profile!"/>
        </View>
        <GeoFencing/>
        <Notification/>
    </>
    );
};

const styles = StyleSheet.create({

})

export default Profile