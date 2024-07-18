import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  FlatList,
  ImageBackground,
  Alert,
  Linking,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { Link } from "expo-router";
import { Fontisto, MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import HeaderTitle from "@/src/components/Reusable/HeaderTitle";
import VerticalSpacer from "@/src/constants/Style";
import HomeHeader from "@/src/components/Header/HomeHeader";
import { useDispatch } from "react-redux";
import { loadMusicFiles, musicFile, permissionAlert, setPermissionAlert } from "@/src/feature/fileSlice";
import { useSelector } from "react-redux";
import { AppDispatch } from "@/src/store/Strore";
import { activeTrack, favouriteSong, getAllPlaylist, getRecentlyPlayedSong, getTheme, loadFavouriteSong, playlist, playPauseToggle, setupPlayer } from "@/src/feature/playerSlice";
import BackgroundImage from "@/src/components/BackgroundImage";
import { recentlyPlayed } from "@/src/slice/MusicSlice";
import { songInterface } from "@/src/Interface/songInterface";
import SongList from "@/src/components/SongList";
import useMusicPlayerEvents from "@/src/hooks/useMusicPlayerEvents";

const options = [
  {
    name: "Library",
    count: 12,
    logo: (
      <Fontisto
        name="music-note"
        size={42}
        color={Colors.main.white}
      />
    ),
    color: "rgba(255, 129, 0, 0.8)",
  },
  {
    name: "Favorite",
    count: 0,
    logo: <MaterialIcons name="favorite-outline" size={42} color={Colors.main.white} />,
    color: "rgba(19, 117, 255, 0.8)",
  },

  {
    name: "Playlist",
    count: 0,
    logo: (
      <MaterialIcons name="playlist-add" size={42} color={Colors.main.white} />
    ),
    color: "rgba(0, 195, 255, 0.8)",
  },
  {
    name: "Most play",
    count: 0,
    logo: <Feather name="clock" size={42} color={Colors.main.white} />,
    color: "rgba(188, 0, 255, 0.8)",
  },
];



const index = () => {
  useMusicPlayerEvents();
  const dispatch = useDispatch<AppDispatch>();

  const permissionAlertMsg = useSelector(permissionAlert)
  const songLists = useSelector(musicFile);
  const playlistData = useSelector(playlist);
  const favouriteSongData = useSelector(favouriteSong);
  const recentlyPlayedSong = useSelector(recentlyPlayed);
  const currentSong = useSelector(activeTrack);

  useEffect(() => {
    if (permissionAlertMsg === "never_ask_again") {
      Alert.alert('Permisson needed', 'This app needs storage permission to read audio files. Please go to app settings and enable the permission.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() }
      ]);
    }

    return () => {
      dispatch(setPermissionAlert(null))
    }

  }, [permissionAlertMsg, dispatch]);

  useEffect(() => {

    const loadMusic = async () => {
       dispatch(getTheme());
      console.log('loading music files')
       dispatch(loadMusicFiles());
       dispatch(setupPlayer());
       dispatch(getAllPlaylist());
       dispatch(loadFavouriteSong());
       dispatch(getRecentlyPlayedSong());
    }

    if (!songLists) {
      loadMusic();
    }

  }, [dispatch]);

  const handlePlayPause = useCallback(
    (song: songInterface) => {
      dispatch(playPauseToggle({ song }));
    },
    [dispatch],
  );


  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>

      <View style={{ flex: 1 }}>

        <BackgroundImage >

          <HomeHeader />
          <View style={styles.conatiner}>


            <View style={styles.optionBoxContainer}>
              {options.map((option, index) => (

                <Link href={option.name === "Library" ? "/library" : option.name === "Favorite" ? "/favorite" :option.name==="Playlist"? "/(drawer)/(tabs)/playlist":"/MostPlayed"} key={index} style={[styles.optionBox, { backgroundColor: option.color }]} asChild >
                  <TouchableOpacity
                    activeOpacity={1}
                  >
                    <View style={{ alignItems: "flex-end" }}>
                      <Text style={styles.optionCount}>{option.name === "Library" ? songLists?.length : option.name === "Playlist" ? playlistData.length : option.name === "Favorite" ? favouriteSongData.length : option.count}</Text>
                    </View>

                    <View style={styles.justifyCenter}>
                      {option.logo}

                      <Text style={styles.optionName}>{option.name}</Text>
                    </View>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>

            <HeaderTitle text={"Recently Played"} />
            <VerticalSpacer margin={20} />

            {recentlyPlayedSong.map((song, index) => <SongList key={index} song={song} currentSong={currentSong?.title == song.title} handlePlayPause={handlePlayPause} />)}
          </View>
        </BackgroundImage>
      </View>


    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingHorizontal: 15,
  },
  optionBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  optionBox: {
    width: 110,
    borderRadius: 5,
    padding: 5,
    marginBottom: 20
  },
  justifyCenter: {
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  optionName: {
    color: Colors.main.white,
    fontSize: 16,
  },
  optionCount: {
    color: Colors.main.white,
  },
});