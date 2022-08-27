import React, { useContext, useEffect, useState } from 'react';
import { Text, FlatList, Pressable, View, Button, TextInput, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'

// Form Components
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

// Images
import Logo from '../../../assets/logo/Logo.png'
import BackGroundImage from '../../../assets/background/BackGroundImage.png'
import { auth, db } from '../../../firebase';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  auth.onAuthStateChanged(function(user) {
    if (user) {
      props.navigation.navigate("Home")
    } else {
      props.navigation.navigate("Login")
    }
  })

  const onLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
          props.navigation.replace("Home")
      }).catch((err) => {
        console.log(err);
      })
  }

  const onRegister = () => {
    props.navigation.navigate("Register")
  }

  const onForgotPassword = () => {
    props.navigation.navigate("ForgotPassword")
  }

  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.loginContainer}>
            <Image source={Logo} style={styles.logo} resizeMode="contain"/>
            <CustomInput placeholder="email" value={email} setValue={setEmail} height="small" width="medium"/>
            <CustomInput placeholder="password" value={password} setValue={setPassword} height="small" width="medium" secureTextEntry={true}/>
            <CustomButton text="Log in" onPress={onLogin} type="primary"/>
            <CustomButton text="Forgot password?" onPress={onForgotPassword} type="secondary"/>
            <View style={styles.flexButton}>
            </View>
            <CustomButton text="Don't have an account yet? Register now!" onPress={onRegister} type="tertiary"/>
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

export default Login;