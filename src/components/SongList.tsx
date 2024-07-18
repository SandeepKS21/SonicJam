import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Colors from "../constants/Colors";
import { Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import { customModerateScale, customScale, customVerticalScale } from "../constants/Style";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { SimpleLineIcons } from '@expo/vector-icons';
import LottieView from "lottie-react-native";
import TrackPlayingAnimation from "./TrackPlayingAnimation";
import { songInterface } from "../Interface/songInterface";
import PopupMenu from "./PopupMenu";
import BottomSheetComponent from "./BotomSheetComponent";
import SquareMusicIcon from "./SquareMusicIcon";

interface songListInterface {
  song: songInterface,
  currentSong: boolean,
  handlePlayPause: (song: songInterface) => void,
}


const SongList = ({ song, currentSong, handlePlayPause }: songListInterface) => {
  const bottomSheetRef = useRef<any>();


  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  // console.log('currentSong',currentSong)

  return (
    <View >

      <BottomSheetComponent ref={bottomSheetRef} song={song} />

      <TouchableOpacity style={[styles.conatiner,]} activeOpacity={0.7} key={song.id} onPress={() => handlePlayPause(song)} >
        <View style={{ flexDirection: "row", flex: 1, gap: 15 }}>

          <SquareMusicIcon />

          <View style={{ gap: 5, width: "70%" }}>
     
            <Text style={styles.songName} numberOfLines={1}>
              {song.title}
            </Text>
            <Text style={styles.artistName} numberOfLines={1}>
              {song.artist ? song.artist : ""}
            </Text>
          </View>

        </View>
        {currentSong && <TrackPlayingAnimation />}

        <Pressable onPress={openBottomSheet} style={{ borderRadius: 20, padding: 10 }}>
          <SimpleLineIcons name="options-vertical" size={16} color="#fff" />
        </Pressable>

      </TouchableOpacity>

    </View>
  );
};

// export default memo(SongList);
export default memo(SongList, (prevProps, nextProps) => {
  return (
    prevProps.song.id === nextProps.song.id &&
    prevProps.currentSong === nextProps.currentSong
  );
});

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    // backgroundColor: "#5149",
    // opacity:2,
    // padding: 5,
    alignItems: "center",
    // paddingRight: 15,
    borderRadius: 5,
    marginBottom: customModerateScale(17),
  
  },
  songName: {
    color: Colors.main.white,
    fontSize: 16,
  },
  artistName: {
    fontSize: 14,
    color: Colors.main.lightGrey,
  },

  highlightSongName: {
    color: "yellow",
    fontSize: 15,
  }
});