import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReusableHeader from '@/src/components/Header/ReusableHeader'
import { customModerateScale, customVerticalScale } from '@/src/constants/Style'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/store/Strore';
import { createPlaylistName, getAllPlaylist, playlist, playlistNames } from '@/src/feature/playerSlice';
import { useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import BackgroundImage from '@/src/components/BackgroundImage';
import useMusicPlayerEvents from '@/src/hooks/useMusicPlayerEvents';



const PlayList = () => {
  useMusicPlayerEvents();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const playlistData = useSelector(playlist);
  const router = useRouter();


  const addPlaylist = () => {
    if (!playlistName || playlistName === "") {
      return Alert.alert("", "Enter Playlist Name")
    }

    const playlistBody = {
      playlistName: playlistName,
      song: []
    }

    dispatch(createPlaylistName(playlistBody));
    setPlaylistName("");
    setModalVisible(false)
  }


  useEffect(() => {

    dispatch(getAllPlaylist());

  }, []);


  const handlePlaylist = (playlistName: string) => {
    const getMatchedPlaylist = playlistData.find((playlist) => playlist.playlistName === playlistName);
    if (getMatchedPlaylist && getMatchedPlaylist.song.length > 0) {
      router.push({ pathname: "/screens/PlaylistSongs", params: { playlistName: playlistName } })
    } else {
      router.push({ pathname: "/screens/AddPlaylistSong", params: { playlistName: playlistName } })
    }

  }


  return (
    <>
      <Dialog.Container visible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <Dialog.Title style={{ color: "#000" }}>Add Playlist</Dialog.Title>
        <Dialog.Input placeholder='Playlist name' onChangeText={setPlaylistName} style={{ color: "#000", fontSize: customModerateScale(15) }} autoFocus={true}>

        </Dialog.Input>
        <Dialog.Button label="Add" onPress={addPlaylist} />
        <Dialog.Button label="Cancel" onPress={() => setModalVisible(false)} />
      </Dialog.Container>

      <BackgroundImage >
        <ReusableHeader title='Playlist' searchSong={() => { }} />
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.playlistMainContainer}>
              {/* playlist list */}
              {playlistData.map((playlist, index) => <Pressable style={styles.playListList} key={index} onPress={() => handlePlaylist(playlist.playlistName)}>
                <MaterialCommunityIcons name='playlist-music-outline' size={50} color={"#ffff"} style={styles.playlistIcon} />

                <View style={styles.playlistNameContainer}>
                  <Text numberOfLines={1} style={styles.playlistName}>{playlist.playlistName}</Text>
                </View>
              </Pressable>)}

              <Pressable style={styles.addPlaylist} onPress={() => { setModalVisible(true) }}>
                <Feather name='plus' size={60} color={"#fff"} s />
              </Pressable>
            </View>

          </View>
        </ScrollView>

      </BackgroundImage>
    </>

  )
}

export default PlayList

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
  },
  playlistMainContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: customModerateScale(35),

    // justifyContent: "space-evenly",
  },
  addPlaylist: {
    height: customVerticalScale(90),
    width: customModerateScale(90),
    backgroundColor: "rgba(21, 255, 213, 0.75)",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center"
  },

  container: {
    paddingHorizontal: customModerateScale(15),
    marginTop: customVerticalScale(10),
    marginBottom: customModerateScale(15)
  },
  modalContainer: {
    backgroundColor: "#fff", height: customVerticalScale(200), borderRadius: 7,
    alignItems: "center",
    padding: customModerateScale(10)
  },
  modalTitle: {
    alignContent: "center",
    fontWeight: "500",
    fontSize: customModerateScale(18)
  },

  playListList: {
    height: customVerticalScale(90),
    width: customModerateScale(90),
    backgroundColor: "rgba(190, 84, 252, 0.9)",
    borderRadius: 7,
    alignItems: "center",
    // justifyContent: "center"
    justifyContent: "flex-end"
  },

  playlistNameContainer: {
    backgroundColor: " rgba(195, 93, 255, 0.8)",
    alignItems: "center",
    padding: 5,
    borderBottomEndRadius: 7,
    borderBottomRightRadius: 7,
    width: "100%"

  },
  playlistName: {
    color: "#fff"
  },

  playlistIcon: {
    marginBottom: customModerateScale(10)
  }

})