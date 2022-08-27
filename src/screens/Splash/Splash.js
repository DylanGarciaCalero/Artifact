import React from 'react'
import { StyleSheet, Image, SafeAreaView, ActivityIndicator, View } from 'react-native'
import { auth } from '../../../firebase'
import LottieView from 'lottie-react-native'
import { useEffect ,useRef } from 'react'
import animationLoading from '../../../assets/animations/animation.json'
import Logo from '../../../assets/logo/Logo.png'

const Splash = ({ navigation }) => {

    const animation = useRef(null)

    useEffect(() => {
        setTimeout(() => {
            loginChecker()
        }, 4000);
    })

    const loginChecker = async () => {
        let user = auth.currentUser;
        if (user) {
            navigation.replace("Home")
        }
        else {
            navigation.replace('Login')
        }
    }

    return (
        <View style={styles.animationContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={animationLoading}
          />
          <Image source={Logo} style={{position:"absolute"}}/>
        </View>
    );
}

export default Splash

const styles = StyleSheet.create({
    animationContainer: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black',
    }
})
