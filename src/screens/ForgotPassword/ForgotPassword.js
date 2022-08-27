import React, { useState } from 'react';
import { Text, FlatList, Pressable, View, Button, TextInput, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'

// Form Components
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

// Images
import Logo from '../../../assets/logo/Logo.png'
import BackGroundImage from '../../../assets/background/BackGroundImage.png'
import { auth, db } from '../../../firebase';

// Ionicons
import FontAwesome from "react-native-vector-icons/FontAwesome"

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  const onRegister = () => {
    props.navigation.navigate("Register")
  }

  const navigateToLogin = () => {
    props.navigation.navigate("Login")
  }

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
    .then(() => {
        setEmailSent(true)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
    });
  }

  if (emailSent) {
    return (
        <>
            <ScrollView style={styles.scrollView}>
                <View style={styles.forgotEmailContainer}>
                    <Image source={Logo} style={styles.logo} resizeMode="contain"/>
                    <View style={styles.emailResetContainer}>
                        <FontAwesome style={styles.paperPlane} name="send" size={20}/>
                        <View style={styles.emailResetContent}>
                            <Text>Password email sent to:</Text>
                            <Text style={{fontWeight: "500"}}>{email}</Text>
                        </View>
                    </View>
                    <CustomButton text="Go back to Login" onPress={navigateToLogin} type="primary"/>
                    <CustomButton text="Don't have an account yet? Register now!" onPress={onRegister} type="tertiary"/>
                </View>
            </ScrollView>
            <ImageBackground source={BackGroundImage} resizeMode="cover" style={styles.backgroundImage}/>
        </>
    )
  } else {
    return (
        <>
          <ScrollView style={styles.scrollView}>
            <View style={styles.forgotEmailContainer}>
                <Image source={Logo} style={styles.logo} resizeMode="contain"/>
                <CustomInput placeholder="email" value={email} setValue={setEmail} height="small" width="medium"/>
                <CustomButton text="Send email reset link" onPress={resetPassword} type="secondary"/>
                <CustomButton text="Don't have an account yet? Register now!" onPress={onRegister} type="tertiary"/>
            </View>
          </ScrollView>
          <ImageBackground source={BackGroundImage} resizeMode="cover" style={styles.backgroundImage}/>
        </>
    );
  }
};

const styles = StyleSheet.create({
  forgotEmailContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  emailResetContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    width: "70%"
  },
  emailResetContent: {
    backgroundColor: "#FEA024",
    height: "100%",
    flex: 1,
    padding: 10,
    borderRadius: 10,
  }, 
  paperPlane: {
    padding: 15,
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

export default ForgotPassword;