import React, { useEffect } from 'react'
import { Text, FlatList, Pressable, View, Image, ScrollView, Switch, TouchableOpacity, Modal, StyleSheet, ActivityIndicator} from 'react-native'
import { useState } from 'react'
import CustomText from '../../components/CustomText'
import Logo from '../../../assets/logo/Logo.png'
import moment from 'moment'
import Navigation from '../../components/Navigation'
import GetUserById from '../../components/GetUserById'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Divider from '../../components/Divider'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import { auth } from '../../../firebase'

const ArtifactsDetail = (props) => {
    const [data, setData] = useState({})
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    useEffect(() => {
        setData(props.route.params.data)
    }, [])

    const validatePassword = () => {
        console.log(password, data.chatPassword)
        if (auth.currentUser.uid !== data.user) {
            if (password == data.chatPassword) {
                goToChatRoom()
            } else {
                setPasswordError('Incorrect password. Please try again.')
            }
        } else {
            goToChatRoom()
        }
    }

    const goToChatRoom = () => {
        props.navigation.navigate('ChatRoom', {
            data: data,
        })
    }

    return (
        <View style={{flex: 1, height:"100%", width: "100%", paddingBottom: 80, backgroundColor: "white"}}>
            <ScrollView>
                <Image source={Logo} style={styles.logoHeader} resizeMode="contain"/>
                <View style={styles.detailItem}>
                    <View>
                        <View style={styles.flexUser}>
                            <CustomText text={data.title}/>
                            { data.anonymous ? 
                            <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <CustomText text="Created by "/>
                                <FontAwesome name="user-secret" size={20}/>
                            </View> : 
                            <GetUserById/>}
                        </View>
                    </View>
                    <View style={styles.flexTime}>
                        <CustomText text={moment(data.created_at).fromNow()}/>
                        <Entypo name="back-in-time" size={24} style={styles.icon}/>
                    </View>
                </View>
                <Divider text="CONTENT"/>
                <View style={styles.content}>
                    <CustomText text={data.message}/>
                </View>
                {   
                    data.chatroom 
                    ? 
                    <>
                        <View style={styles.notice}>
                            <CustomText text="This artifact has a chatroom. Click below to join it!" font="montserrat"/>
                        </View>
                        {
                            data.private_chat ? 
                            data.user == auth.currentUser.uid ? 
                            '' :
                            <>
                                <View style={styles.notice}>
                                    <CustomText text="This chatroom is protected by a password. Please enter the password to enter." font="montserrat" type="warning"/>
                                </View>
                                <View style={{width:"85%", alignSelf: "center", justifyContent: "center", margin: 10, alignItems: "center", flexDirection: "row"}}>
                                    <CustomInput placeholder="password" value={password} setValue={setPassword} width="small" height="small" secureTextEntry={true}/>
                                    <Entypo name="lock" size={24} color="grey" style={{marginLeft: 10}}/>
                                </View>
                                { passwordError !== '' ? <View style={{width: "85%", alignSelf: "center", alignItems: "flex-end"}}><CustomText text={passwordError} font="roboto" type="warning"/></View> : ''}
                            </>
                            : ''
                        }
                    </>
                    :
                    ''
                }
                <View style={styles.extraContent}>
                    {data.chatroom ? <CustomButton onPress={() => validatePassword()} text="Enter this chatroom" size="half" type="primary"/> : ''}
                    <CustomButton text="View on map" type="outline" size="half" height="medium"/>
                </View>
            </ScrollView>
            <Navigation props={props}/>
        </View>
    )
}

const styles = StyleSheet.create({
    detailItem: {
        width: "85%",
        alignSelf: "center",
        backgroundColor: 'orange',
        marginBottom: 4,
        padding: 12,
        paddingHorizontal: 20,
        marginTop: 50,
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        borderRadius: 20,
        zIndex: 19,
    },
    content: {
        width: "85%",
        backgroundColor: "orange",
        alignSelf: "center",
        padding: 20,
        borderRadius: 20,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
    },
    extraContent: {
        width: "85%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20,
    },
    logoHeader: {
        height: 50,
        alignSelf: "center",
        zIndex: 20,
        position: "absolute",
        top: 25
    },
    flexTime: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    flexUser: {
        flexDirection: "column",
        justifyContent: "center",
    },
    notice: {
        width: "85%",
        alignSelf: "center",
        backgroundColor: "#f7f7eb",
        padding: 10,
    }
})

export default ArtifactsDetail