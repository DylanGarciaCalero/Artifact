import React, { useState } from 'react';
import { Text, FlatList, Pressable, View, Button, TextInput, Image, StyleSheet, ImageBackground, ScrollView, Touchable } from 'react-native';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { useEffect } from 'react';

// Form Components
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

// Images
import Logo from '../../../assets/logo/Logo.png'
import BackGroundImage from '../../../assets/background/BackGroundImage.png'
import { auth, db } from '../../../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../../components/CustomText';

/// TESTING GEOFENCING

const GeoFencing = (props) => {
    
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [message, setMessage] = useState('')

    const [editProfile, setEditProfile] = useState(false)

    const data = 
    [{latitude: 50.933570, longitude: 4.047362, radius: 50},
    {latitude: 59.933570, longitude: 10.047362, radius: 50},
    {latitude: 50.933570, longitude: 4.047362, radius: 50},
    { latitude: 50.933570, longitude: 4.047362, radius: 50}
    ]

    //First time useEffect runs and gets the location permission
    useEffect(() => {
        (async () => {
          
        let { status } = await Location.requestForegroundPermissionsAsync();
        console.log('front',status)
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(`${location.coords.latitude} ${location.coords.longitude}`);

        let backPerm = await Location.requestBackgroundPermissionsAsync();
        
        console.log('back',backPerm);
          
        // setErrorMsg(null);
          //  await Location.startGeofencingAsync('ACTION', data)
          // await Location.stopGeofencingAsync('ACTION')
        // await Location.startGeofencingAsync(LOCATION_TASK_NAME, [{latitude: 50.933570, longitude: 4.047362, radius: 50}])
        })();
    }, []);

  // const LOCATION_TASK_NAME = 'left-or-entered-region';
  // data.forEach((item, index) => {
  //   TaskManager.defineTask('ACTION', ({ data: { eventType, region }, error }) => {
  //     console.log(index," executed")
  //   if (error) {
  //     // Error occurred - check `error.message` for more details.
  //     console.log('error',index, error.message);
  //     return;
  //   }
  //   if (eventType === Location.GeofencingEventType.Enter) {
  //     // User entered region
  //     console.log(auth.currentUser.email, 'User entered region:');
  //     setMessage("Hello there!")
  //   } else if (eventType === Location.GeofencingEventType.Exit) {
  //     // User exited region
  //     console.log(auth.currentUser.email, 'User exited region');
  //     setMessage("Goodbye... :(")
  //   }
  //   });
  // })
  // TaskManager.defineTask(LOCATION_TASK_NAME, ({ data: { eventType, region }, error }) => {
  //   console.log("1 executed")
  // if (error) {
  //   // Error occurred - check `error.message` for more details.
  //   console.log('error',error.message);
  //   return;
  // }
  // if (eventType === Location.GeofencingEventType.Enter) {
  //   // User entered region
  //   console.log(auth.currentUser.email, 'User entered region:', LOCATION_TASK_NAME);
  //   setMessage("Hello there!")
  // } else if (eventType === Location.GeofencingEventType.Exit) {
  //   // User exited region
  //   console.log(auth.currentUser.email, 'User exited region');
  //   setMessage("Goodbye... :(")
  // }
  // });

      return (
        <View style={styles.container}>
          <Text>{errorMsg}</Text>
          <Text>{message}</Text>
        </View>
      );
};

const styles = StyleSheet.create({

})

export default GeoFencing