import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import {
  customModerateScale,
  customScale,
  customVerticalScale,
} from "@/src/constants/Style";
import Colors from "@/src/constants/Colors";
import { AntDesign, Entypo, MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { Link } from "expo-router";
import { BottomModal } from "react-native-modals";
import MusicPlayer from "./MusicPlayer";
import TrackPlayer, { Event, useTrackPlayerEvents } from 'react-native-track-player';
import { songInterface } from "@/src/Interface/songInterface";
import { useSelector } from "react-redux";
import { activeTrack, currentPlaylistName, isPlaying, playPauseToggle, skipToNext, skipToPreviousTrack } from "@/src/feature/playerSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/store/Strore";
import MovingTextComponent from "../MovingTextComponent";
import SquareMusicIcon from "../SquareMusicIcon";
import { LinearGradient } from "expo-linear-gradient";



const BottomSongBar = () => {
  const [isSongModalVisible, setIsSongModalVisible] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const currentTrack = useSelector(activeTrack);
  const trackPlayingStatus = useSelector(isPlaying);
  const playlistNameData = useSelector(currentPlaylistName);

  const playMusic = async (music: songInterface) => {
    dispatch(playPauseToggle({ song: music, playlistName: playlistNameData ?? "" }));
  }


  // const handleNextSong = () => {
  //   dispatch(skipToNext());
  // }

  // const handlePreviousSong = () => {
  //   dispatch(skipToPreviousTrack());
  // }


  return (
    <>
      {currentTrack && <LinearGradient colors={['#DA4453', '#89216B']} style={styles.container}>


        {/* music player modal */}
        <BottomModal visible={isSongModalVisible}

          onHardwareBackPress={() => {
            setIsSongModalVisible(false);
            return true;
          }}

          swipeDirection={['up', 'down']} swipeThreshold={200}  >

          <MusicPlayer isSongModalVisible={isSongModalVisible} setIsSongModalVisible={setIsSongModalVisible} />

        </BottomModal>


        <View style={styles.songContainer}>
          <TouchableOpacity style={{ flexDirection: "row", gap: 10, flex: 1 }} activeOpacity={1} onPress={() => setIsSongModalVisible(!isSongModalVisible)}>

            <SquareMusicIcon />

            <View style={[styles.rowGap, { alignItems: "flex-start", justifyContent: "flex-start", width: "75%", overflow: "hidden", marginLeft: 0 }]}>

              {/* <Text numberOfLines={1} style={{ fontWeight: "500", color: "#fff" }}>{currentTrack?.title}</Text> */}

              <MovingTextComponent text={currentTrack?.title} animationThreshold={15} style={styles.songName} />

              <Text style={{ color: Colors.main.lightGrey }}>{currentTrack?.artist}</Text>
            </View>
          </TouchableOpacity>



          <View style={{ flexDirection: "row", alignItems: "center", paddingRight: 10 }}>

            <TouchableOpacity onPress={() => playMusic(currentTrack)} activeOpacity={1}>
              {trackPlayingStatus == "playing" || trackPlayingStatus == "buffering" ? <Ionicons name="pause" size={30} color="#fff" /> : <Entypo name="controller-play" size={30} color="#fff" />}
            </TouchableOpacity>

          </View>
        </View>

      </LinearGradient>}
    </>

  );
};

export default BottomSongBar;

const styles = StyleSheet.create({
  container: {
    height: customScale(46),
    // backgroundColor: Colors.main.lightRed,
    borderRadius: 5,
    position: "absolute",
    bottom: customScale(15),
    left: customScale(10),
    // right: customModerateScale(5),
    justifyContent: "space-between",
    padding: 3,
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    zIndex: 999
  },
  songName: {
    fontWeight: "500", color: "#fff",
  },
  songContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowGap: {
    justifyContent: "center",
  },
  coverImg: {
    height: customVerticalScale(45),
    width: customScale(45),
    resizeMode: "cover",
    borderRadius: 7,
  },
});
