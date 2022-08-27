import React from 'react'
import { Text, FlatList, Pressable, View, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import { auth, db } from '../../../firebase'
import { signOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native'

import CustomButton from '../../components/CustomButton'
import CustomText from '../../components/CustomText'
import Header from '../../components/Header'
import ArtifactsHeader from '../../components/ArtifactsHeader'
import Navigation from '../../components/Navigation'

const Home = (props) => {
  const [welcomeModal, setWelcomeModal] = useState(true)

  const checkFirstTimeUser = () => {
    AsyncStorage.getItem("welcome", (err, result) => {
      if (err) {

      } else {
        if (result == null) {
          console.log("FIRST TIME USER", result);
          setWelcomeModal(true)
        } else {
          console.log(result)
        }
      }
    });
    AsyncStorage.setItem("welcome", JSON.stringify({"value": "true"}), (err, result) => {
      console.log("error", err, "result", result)
    })
  }

  const route = useRoute();

  checkFirstTimeUser();

  const showNextScreen = () => {
    console.log("next screen")
  }

  const navToCreateArtifact = () => {
    props.navigation.navigate("CreateArtifact")
  }

  return (
    <View style={{flex: 1, height: "100%", width: "100%", backgroundColor: "white"}}>
      <Header text={`${auth.currentUser.email}`} props={props.navigation}/>
      <ArtifactsHeader onPress={props}/>
      <Modal
        animationType='slide'
        transparent={true}
        style={styles.welcomeModal}
        visible={welcomeModal}
      >
        <View
          style={{flex: 1, justifyContent: "center", alignItems: "center"}}
        >
          <View style={{width: "75%", height:"50%"}}>
            <CustomText Text={`Welcome! ${auth.currentUser.email}`} type="roboto"/>
            <CustomText text="As this is your first time here, would you like us to show you around?" type="montserrat"/>
            <View style={{flexDirection: "row"}}>
              <CustomButton text="Yes" onPress={showNextScreen} type="primary" size="half"/>
              <CustomButton text="No" onPress={() => setWelcomeModal(false)} type="primary" size="half"/>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{justifyContent: "center", alignItems:"center", width:"85%", alignSelf: "center", position: "absolute", bottom: 0, marginBottom: 80}}>
        <CustomButton text="Create an Artifact!" type="primary" onPress={navToCreateArtifact} size="full" height="big"/>
      </View>
      <Navigation props={props} route={route.name}/>
    </View>
  )
}

const styles = StyleSheet.create({
  welcomeModal: {
    backgroundColor: "red",
    elevation: 4,
  },
})

export default Home