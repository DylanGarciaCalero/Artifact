import React, { useState, useEffect, useCallback, createContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading'
import { Text } from 'react-native'

import {
  Montserrat_100Thin,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light,
  Montserrat_300Light_Italic,
  Montserrat_400Regular,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black,
  Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';

import {
  RobotoSlab_100Thin,
  RobotoSlab_200ExtraLight,
  RobotoSlab_300Light,
  RobotoSlab_400Regular,
  RobotoSlab_500Medium,
  RobotoSlab_600SemiBold,
  RobotoSlab_700Bold,
  RobotoSlab_800ExtraBold,
  RobotoSlab_900Black,
} from '@expo-google-fonts/roboto-slab';

import Home from './src/screens/Home/Home'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import ForgotPassword from './src/screens/ForgotPassword'
import CreateArtifact from './src/screens/CreateArtifact'
import CreateArtifactTwo from './src/screens/CreateArtifactTwo'
import Discover from './src/screens/Discover'
import Splash from './src/screens/Splash'
import { auth } from './firebase'
import Profile from './src/screens/Profile'
import Artifacts from './src/screens/Artifacts'
import ArtifactsDetail from './src/screens/ArtifactsDetail/ArtifactsDetail'
import ChatRoom from './src/screens/ChatRoom/ChatRoom'

const Stack = createStackNavigator()

export default function App() {

  let [fontsLoaded] = useFonts({
    RobotoSlab_100Thin,
    RobotoSlab_200ExtraLight,
    RobotoSlab_300Light,
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_600SemiBold,
    RobotoSlab_700Bold,
    RobotoSlab_800ExtraBold,
    RobotoSlab_900Black,
    Montserrat_100Thin,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light,
    Montserrat_300Light_Italic,
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black,
    Montserrat_900Black_Italic,
  })

  if (!fontsLoaded) {
    return <Text>Loading</Text>
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash} options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="Login" component={Login} options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="Register" component={Register} options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false,
            title: "Home"
          }}/>
          <Stack.Screen name="CreateArtifact" component={CreateArtifact} options={{
            headerShown: false,
            title: "CreateArtifact"
          }}/>
          <Stack.Screen name="CreateArtifactTwo" component={CreateArtifactTwo} options={{
            headerShown: false,
            title: "CreateArtifactTwo"
          }}/>
          <Stack.Screen name="Profile" component={Profile} options={{
            headerShown: false,
            title: "Profile"
          }}/>
          <Stack.Screen name="Discover" component={Discover} options={{
            headerShown: false,
            title: "Profile"
          }}/>
          <Stack.Screen name="Artifacts" component={Artifacts} options={{
            headerShown: false,
            title: "Artifacts"
          }}/>
          <Stack.Screen name="ArtifactsDetail" component={ArtifactsDetail} options={{
            headerShown: false,
            title: "ArtifactsDetail"
          }}/>
          <Stack.Screen name="ChatRoom" component={ChatRoom} options={{
            headerShown: false,
            title: "ChatRoom"
          }}/>
        </Stack.Navigator>
        <StatusBar style="default" />
      </NavigationContainer>
    )
  }
}