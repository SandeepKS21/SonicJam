import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { songInterface } from '@/src/Interface/songInterface'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { customModerateScale } from '@/src/constants/Style';
import { Fontisto } from '@expo/vector-icons';
import Colors from '@/src/constants/Colors';
import SquareMusicIcon from '@/src/components/SquareMusicIcon';


interface AddPlaylistSongList {
    song: songInterface,
    handleSelectedSong: (song: songInterface) => void,
    isSongSelcted: boolean
}

const AddPlaylistSongList = ({ song, handleSelectedSong, isSongSelcted }: AddPlaylistSongList) => {
    // const [setS]

    return (
        <View style={styles.songBox}>

            <BouncyCheckbox fillColor="rgba(39, 245, 126, 0.87)" isChecked={isSongSelcted} onPress={(isChecked: boolean) => { handleSelectedSong(song) }} style={styles.checkBox} innerIconStyle={styles.squareCheckbox} iconStyle={styles.squareCheckbox} />

            <Pressable style={styles.songContainer} onPress={() => { handleSelectedSong(song) }}>
                <SquareMusicIcon />
                <View style={styles.songDetails}>
                    <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
                </View>

            </Pressable>

        </View>
    )
}

export default AddPlaylistSongList

const styles = StyleSheet.create({
    songBox: {
        marginBottom: customModerateScale(10),
        marginTop: customModerateScale(10),
        flexDirection: "row"

    },
    checkBox: {
        borderColor: "#FFF",

    },
    squareCheckbox: {
        height: customModerateScale(20), width: customModerateScale(20), borderRadius: 2, borderColor: "#fff"
    },
    songContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15

    },

    songDetails: {

    },
    songTitle: {
        color: "#fff",
        fontSize: customModerateScale(14)
    }
})