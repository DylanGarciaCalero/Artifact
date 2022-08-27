import React, { useEffect } from 'react'
import { Text, FlatList, Pressable, View, Image, ScrollView, Switch, TouchableOpacity, Modal, StyleSheet, ActivityIndicator} from 'react-native'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import Navigation from '../../components/Navigation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ref, set } from 'firebase/database'
import { db, auth } from '../../../firebase'
import { useState } from 'react'
import uuid from 'react-native-uuid'
import { useList } from 'react-firebase-hooks/database';
import CustomText from '../../components/CustomText'
import { Dimensions } from 'react-native'

const width = Dimensions.get("window").width;
const height = Dimensions.get("screen").height;

const ChatRoom = (props) => {
    const [message, setMessage] = useState('')
    const [identifier, setIdentifier] = useState('')
    const [randomize, setRandomize] = useState(true)
    const [snapshots, loading, error] = useList(ref(db, `chatrooms/${props.route.params.data.id}/messages`));

    useEffect(() => {
        setIdentifier(uuid.v4())
    }, [randomize])

    const sendMessage = () => {
        if (message !== '' && identifier) {
            set(ref(db, `chatrooms/${props.route.params.data.id}/messages/` + identifier), {
                id: identifier,
                message: message,
                time: Date.now(),
                senderId: auth.currentUser.uid
            }).then(setRandomize(!randomize)).then(setMessage(''))
        }
    }

    return (
        <View style={{height:"100%", width: "100%", backgroundColor: "white"}}>
            { loading ? 
                <Text>Loading messages</Text>
                :
                <FlatList
                    style={{height: 100, width: "100%", paddingTop: 140}}
                    inverted
                    data={snapshots ? snapshots.sort((a, b) => new Date(b.val().time) - new Date(a.val().time)) : ''}
                    keyExtractor={(item) => item.val().id}
                    renderItem={({item}) => {
                        return (
                            <View style={{
                                maxWidth: width, height: 'auto',
                                alignSelf: auth.currentUser.uid == item.val().senderId ? "flex-end": "flex-start", margin: 10
                            }}>
                                <CustomText text={item.val().message}/>
                            </View>
                        )
                    }}
                />
            }
            <View style={styles.chatInputContainer}>
                <CustomInput placeholder="Your message.." width="medium" height="small" value={message} setValue={setMessage}/>
                <TouchableOpacity onPress={() => sendMessage()}>
                    <View style={{height: 40, width: 60, backgroundColor:"orange", marginLeft: -18, borderRadius: 12}}>
                        <FontAwesome name="send" color="white" size={24} style={{flex:1, alignSelf: "center", padding: 7}}/>
                    </View>
                </TouchableOpacity>
            </View>
            <Navigation props={props}/>
        </View>
    )
}

const styles = StyleSheet.create({
    chatInputContainer: {
        position: "absolute",
        bottom: 80,
        width: "80%",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    }
})

export default ChatRoom