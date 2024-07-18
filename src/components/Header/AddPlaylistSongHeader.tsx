import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { customModerateScale, customVerticalScale } from '@/src/constants/Style'
import { AntDesign, Entypo, Feather, Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { TextInput } from 'react-native-gesture-handler'

interface addPlaylistHeaderInterface {
    playlistName: string,
    searchSong: (search: string) => void,
    selectedSongCount:number,
    addPlaylist:()=>void
}

const AddPlaylistSongHeader = ({ playlistName,searchSong,selectedSongCount,addPlaylist }: addPlaylistHeaderInterface) => {

    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <View style={styles.row}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <AntDesign name='arrowleft' size={24} color={'#ffff'} />
                        </Pressable>
                        <Text style={{ fontSize: 20, color: "#fff" }}>{selectedSongCount} songs selected</Text>
                    </View>

                    <Pressable style={{ flexDirection: "row", gap: 5, alignItems: "center" }} onPress={addPlaylist}>
                        <Entypo name="check" size={24} color="#fff" />
                    </Pressable>

                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name='search' size={20} style={styles.searchIcon} />
                    <TextInput onChangeText={(search)=>searchSong(search)} placeholder='Search song' style={styles.searchInput} />

                </View>
            </View>
        </SafeAreaView>
    )
}

export default AddPlaylistSongHeader

const styles = StyleSheet.create({
    container: {
        height: customVerticalScale(80),
        paddingHorizontal: customModerateScale(15),
        marginTop: customVerticalScale(10),
    },
    subContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    searchContainer: {
        backgroundColor: "rgba(237, 235, 236, 0.95)",
        marginTop: customModerateScale(15),
        width: "100%",
        borderRadius: 7,
        paddingHorizontal: customModerateScale(5)
    },

    searchInput: {
        color: "#000",
        fontSize: customModerateScale(17),
        padding: customModerateScale(5),
        paddingLeft: customModerateScale(30)
    },
    searchIcon: {
        position: "absolute",
        top: 8,
        left: 5
    }
})