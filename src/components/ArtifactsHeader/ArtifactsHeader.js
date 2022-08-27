import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import CustomText from '../CustomText'
import { auth, db } from '../../../firebase'
import Logo from '../../../assets/logo/Logo.png'
import { useList } from 'react-firebase-hooks/database';
import { ref } from 'firebase/database'

const ArtifactsHeader = ({created, found, selected, onPress, navigation }) => {
    const [snapshotsCreated, loadingCreated, errorCreated] = useList(ref(db, `users/${auth.currentUser.uid}/artifacts/created`));
    const [snapshotsFound, loadingFound, errorFound] = useList(ref(db, `users/${auth.currentUser.uid}/artifacts/found`));
    const [selectedView, setSelectedView] = useState('created')

    useEffect(() => {
        setSelectedView(selected)
    }, [])
   
    return (
        <>
            <View style={styles.headerContainer} onPress={onPress}>
                <View style={[styles.headerLeft, selectedView == 'created' ? styles.selected : '']}>
                    <TouchableOpacity onPress={() => onPress.navigation.navigate('Artifacts', {
                        selected: 'created'
                    })}>
                        <CustomText text={snapshotsCreated.length +' Created'} type="roboto"/>
                    </TouchableOpacity>
                </View>
                
                <View style={[styles.headerLeft, selectedView == 'found' ? styles.selected : '']}>
                    <TouchableOpacity onPress={() => onPress.navigation.navigate('Artifacts', {
                        selected: 'found'
                    })}>
                        <CustomText text={snapshotsFound.length + ' Found'} type="roboto"/>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#C0F3D3",
        height: 60,
        width: "85%",
        maxWidth: "85%",
        alignSelf: "center",
        borderRadius: 20,
    },
    headerLeft: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        padding: 10,
    },
    headerRight: {
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        padding: 10,
    },
    selected: {
        backgroundColor: "orange",
        width: "60%",
        borderRadius: 15,
    }
})

export default ArtifactsHeader