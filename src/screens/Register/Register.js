import React, { useState } from 'react';
import { Text, FlatList, Pressable, View, Button, TextInput, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native'


// Form Components
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

// Images
import Logo from '../../../assets/logo/Logo.png'
import BackGroundImage from '../../../assets/background/BackGroundImage.png'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { set, ref } from 'firebase/database';

const Register = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordV, setPasswordV] = useState('')
  const [username, setUsername] = useState('')

  const onRegister = () => {
    if (password == passwordV) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        set(ref(db, 'users/' + userCredential.user.uid), {
          username: username,
          email: userCredential.user.email,
        })
      }).then(() => props.navigation.navigate("Home"))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      })
    } else {
      console.log('passwords dont match!')
    }
  }

  const onLoginRedirect = () => {
    props.navigation.navigate("Login")
  }

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.loginContainer}>
            <Image source={Logo} style={styles.logo} resizeMode="contain"/>
            <CustomInput placeholder="username" value={username} setValue={setUsername} height="small" width="medium"/>
            <CustomInput placeholder="email" value={email} setValue={setEmail} height="small" width="medium"/>
            <CustomInput placeholder="password" value={password} setValue={setPassword} secureTextEntry={true} height="small" width="medium"/>
            <CustomInput placeholder="password verification" value={passwordV} setValue={setPasswordV} secureTextEntry={true} height="small" width="medium"/>
            <CustomButton text="Register" onPress={onRegister} type="primary"/>
            <CustomButton text="Already have an Account? Log in!" onPress={onLoginRedirect} type="tertiary"/>
        </View>
      </ScrollView>
      <ImageBackground source={BackGroundImage} resizeMode="cover" style={styles.backgroundImage}/>
    </>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 140,
    marginBottom: 40,
  },
  flexButton: {
    flexDirection: 'row',
  },
  scrollView: {
    backgroundColor: "black",
    opacity: 0.8,
    zIndex: 2,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    opacity: 0.8,
    height: "100%",
    width: "100%",
    position: 'absolute',
    zIndex: 1,
  }
})

export default Register;