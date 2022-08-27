import React from 'react'
import { Text, FlatList, Pressable, View, Image, ScrollView, Switch, TouchableOpacity, Modal, StyleSheet, TextInput, Button } from 'react-native'
import { auth } from '../../../firebase'
import { signOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';

import Logo from '../../../assets/logo/Logo.png'
import CustomButton from '../../components/CustomButton'
import CustomText from '../../components/CustomText'
import CustomInput from '../../components/CustomInput'
import Header from '../../components/Header'
import ArtifactsHeader from '../../components/ArtifactsHeader'
import Navigation from '../../components/Navigation'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Divider from '../../components/Divider'

// FORMIK
import { Formik } from 'formik';
import * as yup from 'yup'

const CreateArtifact = (props) => {

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('')
    const [anonymous, setAnonymous] = useState(false)
    const [image, setImage] = useState('')
    const [chatRoom, setChatRoom] = useState(false)
    const [privateA, setPrivateA] = useState(true)
    const [chatPassword, setChatPassword] = useState(null)

    const [titleError, setTitleError] = useState('');
    const [messageError, setMessageError] = useState('')
    const [chatPasswordError, setChatPasswordError] = useState('')

    const toggleAnonymous = () => setAnonymous(previousState => !previousState)
    const toggleChatRoom = () => setChatRoom(previousState => !previousState)

    const checkPermissions = async () => {
        console.log("CLICKED")
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted'){
                alert('Sorry, we need camera roll permissions to make this work!');
            } else {
                pickImage()
            }
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            try {
                setImage(result.uri)
            } catch (err) {
                console.log(err)
            }
        }
    };

    const CreateArtifactSchema = yup.object().shape({
        title: yup.string()
          .min(4, 'Too Short!')
          .max(30, 'Too Long!')
          .required('Required'),
        message: yup.string()
          .min(4, 'Too Short!')
          .max(300, 'Too Long!')
          .required('Required'),
    });

    return (
        <View style={{flex: 1, height:"100%", width: "100%", paddingBottom: 80, backgroundColor: "white" }}>
            <ScrollView >
                <Formik
                    initialValues={{
                        title: '',
                        message: '',
                    }}
                    validationSchema={CreateArtifactSchema}
                    onSubmit={values => {
                        if ((chatRoom && !privateA && chatPassword !== null) || (chatRoom && privateA) || (!chatRoom)) {
                            props.navigation.navigate('CreateArtifactTwo', {
                                title: values.title,
                                message: values.message,
                                user: auth.currentUser.uid,
                                anonymous: anonymous ? true : false,
                                image: image ? image : null,
                                chatroom: chatRoom,
                                private: chatRoom ? !privateA : null,
                                chatPassword: chatRoom && !privateA ? chatPassword : null 
                            })
                        } else {
                            setChatPasswordError('private chatrooms should have a password.')
                        }
                    }}
                >
                  {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                    <View>
                <Image source={Logo} style={styles.logoHeader} resizeMode="contain"/>
                <View style={styles.createHeaderContainer}>
                    <View style={styles.createHeader}>
                        <CustomText text="Create your artifact" font="roboto"/>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <CustomInput 
                        name="title"
                        value={values.title} 
                        setValue={handleChange('title')} 
                        onBlur={handleBlur('title')}
                        placeholder="Create a title for your artifact" 
                        width="big" 
                        height="small"
                    />
                    {errors.title && touched.title ? (
                        <Text style={styles.error}>{errors.title == "Too Short!" ? errors.title + ' (' + values.title.length + '/4)' : errors.title}  </Text>
                    ) : null}
                    <CustomInput 
                        name="message"
                        value={values.message} 
                        setValue={handleChange('message')}
                        onBlur={handleBlur('message')} 
                        placeholder="Your message ..." 
                        width="big" 
                        height="huge"
                        absolute={values.message.length + '/' + '300'}
                    />
                    {errors.message && touched.message ? (
                        <Text style={styles.error}>{errors.title == "Too Short!" ? errors.message + ' (' + values.message.length + '/4)' : errors.message}</Text>
                    ) : null}
                    { image !== '' ? 
                    <View style={{ height: 200, width: "100%", flexDirection: "row", alignSelf:"flex-start", marginBottom: 20}}>
                        <TouchableOpacity onPress={() => checkPermissions()} style={{height: "100%" , width: "100%"}}>
                        <Image source={{uri: image}} style={{ height: "100%", width: "100%", borderRadius: 20, borderWidth: 2, borderColor: "#FEA024", marginBottom: 30 }} resizeMode="cover"/> 
                        </TouchableOpacity>
                        <View style={{backgroundColor: "#FEA024", height: 40, width: 40, justifyContent: "center", alignItems:"center", borderRadius: 100, position:"absolute", bottom: -10, left: -10}}>
                            <TouchableOpacity onPress={() => setImage('')}>
                            <Feather name="trash" size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    : ''}
                    <View style={styles.switchContainer}>
                        <View style={styles.emojiContainer}>
                            { image !== '' ? '' :
                                <TouchableOpacity onPress={() => checkPermissions()}>
                                    <Entypo name="images" size={24} color="#FEA024"/>
                                </TouchableOpacity>
                             }
                        </View>
                        <View style={styles.innerSwitchContainer}>
                            <CustomText text="Anonymous" font="roboto"/>
                            <Switch
                                trackColor={{ false: "#767577", true: "#C0F3D3" }}
                                thumbColor={anonymous ? "#FEA024" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleAnonymous}
                                value={anonymous}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.wrapper}>
                    <View style={styles.noticeContainer}>
                        { anonymous ? 
                        <CustomText text="Your username will not be displayed to the finder. Instead it will show Anonymous." font="montserrat" /> :
                        <CustomText text="Your username will be displayed to the finder of this Artifact." font="montserrat"/>
                        }
                    </View>
                </View>
                <Divider text="CHAT"/>
                <View style={styles.wrapper}>
                    <View style={styles.switchContainer}>
                        <View style={styles.innerSwitchContainer}>
                            <CustomText text="Create chatroom" font="roboto"/>
                            <Switch
                                trackColor={{ false: "#767577", true: "#C0F3D3" }}
                                thumbColor={chatRoom ? "#FEA024" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleChatRoom}
                                value={chatRoom}
                            />
                        </View>
                        <TouchableOpacity style={styles.flexPrivate} onPress={() => setPrivateA(!privateA)} disabled={chatRoom ? false : true}>
                            <CustomText text={privateA ? 'public' : 'private'} disabled={ chatRoom ? false : true} font="roboto"/>
                            {!privateA ? <Entypo name="lock" color={chatRoom ? "black" : "lightgray"} size={24}/> : <Entypo name="lock-open" color={chatRoom ? "black" : "lightgray"} size={24}/>}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.noticeContainer}>
                        <CustomText text="Create a chatroom for people who have connected to this Artifact" font="montserrat"/>
                        {
                            chatRoom ?
                            <CustomText text={privateA ? "Everyone who found this Artifact is able to join the chatroom." : "Only people with the password are able to join this chatroom."} color="notice" font="montserrat"/> :
                            ''
                        }
                    </View>
                </View>
                <View style={[styles.wrapper, chatRoom ? '' : styles.noDisplayContainer]}>
                    <View style={[styles.passwordInputContainer, chatRoom ? '' : styles.noDisplayContainer, privateA ? styles.disabled : '' ]}>
                        <View style={{width: "30%"}}>
                            <CustomText text="Set password" font="roboto"/>
                        </View>
                        <View style={{width: "70%", alignItems:"flex-end"}}>
                            <CustomInput disabled={privateA ? true :  false} text="password" placeholder="password" value={chatPassword} setValue={setChatPassword} secureTextEntry={true} height="small" width="medium"/>
                        </View>
                    </View>
                    {chatPasswordError ? <Text style={styles.error}>{chatPasswordError}</Text>:''}
                </View>    
                <View style={styles.nextStep}>
                    <CustomText text="Step 1/2" font="roboto" />
                    <CustomButton onPress={handleSubmit} text="Next step" type="primary" size="half"/>
                </View>
                </View>
                    )}
                </Formik>
            </ScrollView>
            <Navigation props={props}/>
        </View>
    )
}

const styles = StyleSheet.create({
    createHeaderContainer: {
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        height: 90,
    },
    inputContainer: {
        width: "85%",
        alignSelf: "center",
        alignItems: "center",
        marginTop: -25,
    },
    logoHeader: {
        height: 50,
        alignSelf: "center",
        position: "absolute",
        top: 25,
        zIndex: 20,
    },
    createHeader: {
        width: "85%",
        height: "100%",
        backgroundColor: "#FEA024",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        padding: 10,
    },
    switchContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    innerSwitchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-end"
    },
    switchPrivateContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    flexPrivate: {
        width: 90,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    passwordInputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    nextStep: {
        width: "85%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 30,
    },
    noticeContainer: {
        width: "100%",
        opacity: 0.5,
    },
    emojiContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 60,
    }, 
    noDisplayContainer: {
        display: "none",
    },
    disabled: {
        opacity: 0.3
    },
    wrapper: {
        width: "85%",
        alignSelf: "center",
        backgroundColor: "#f7f7eb",
        padding: 20,
    },
    error: {
        alignSelf: 'flex-end', 
        color: 'red',
        fontSize: 12,
        marginBottom: 4,
    }
})

export default CreateArtifact