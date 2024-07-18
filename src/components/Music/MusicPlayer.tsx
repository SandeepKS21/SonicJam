import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { Entypo, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { customModerateScale, customScale, customVerticalScale } from '@/src/constants/Style';
import Slider from '@react-native-community/slider';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';;
import { ModalContent } from 'react-native-modals'
import { LinearGradient } from 'expo-linear-gradient';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { activeTrack, favouriteSong, handelRepeatSong, handleSongMute, isAudioMute, isPlaying, loadFavouriteSong, playPauseToggle, repeatMode, skipToNext, skipToPreviousTrack, toggleFavouriteSong } from '@/src/feature/playerSlice';
import { songInterface } from '@/src/Interface/songInterface';
import { AppDispatch } from '@/src/store/Strore';
import { seekTo } from 'react-native-track-player/lib/src/trackPlayer';
import { formatTime } from '@/src/utils/dateTime';
import useMusicPlayerEvents from '@/src/hooks/useMusicPlayerEvents';
import { shareMusic } from '@/src/utils/coman';




interface musicPlaerInterface {
    isSongModalVisible: boolean,
    setIsSongModalVisible: (value: boolean) => void;
}



const MusicPlayer = ({ isSongModalVisible, setIsSongModalVisible }: musicPlaerInterface) => {

    const dispatch = useDispatch<AppDispatch>();
    const isSongMute = useSelector(isAudioMute);
    const currentSong = useSelector(activeTrack);
    const playerState = useSelector(isPlaying);
    const repeatState = useSelector(repeatMode);
    const favouriteSongList = useSelector(favouriteSong);

    const isFavourite = useMemo(() => {
        return currentSong
            ? favouriteSongList.findIndex((favouriteSong) => favouriteSong.title === currentSong.title) !== -1
            : false;
    }, [currentSong, favouriteSongList]);

    // music player event
    useMusicPlayerEvents();

    const { position, duration } = useProgress();

    const trackPosition = formatTime(position);
    const trackDuration = formatTime(duration);

    useEffect(() => {
        dispatch(loadFavouriteSong());
    }, [dispatch])


    const playPause = async (music: songInterface | null) => {
        if (music) dispatch(playPauseToggle({ song: music }));
    }

    const nextSong = () => {
        dispatch(skipToNext())
    }

    const previousSong = () => {
        dispatch(skipToPreviousTrack());
    }

    const onSliderValueChange = (value: number) => {
        seekTo(value);
    }

    const handleRestartSong = async () => {

        await TrackPlayer.seekTo(0);
    }

    const handleRepeatMode = () => {
        let newRepeatMode;

        switch (repeatState) {
            case 'Off':
                newRepeatMode = 'Track';
                break;

            case 'Track':
                newRepeatMode = 'Queue';
                break;

            case 'Queue':
                newRepeatMode = 'Off';
                break;

            default:
                newRepeatMode = 'Queue';

        }

        dispatch(handelRepeatSong(newRepeatMode))

    }

    const getRepeatIcon = () => {
        switch (repeatState) {
            case 'Off':
                return 'repeat-off';

            case 'Track':
                return 'repeat-once';

            case 'Queue':
                return 'repeat';

            default:
                return 'repeat-once';
        }

    }

    const handleVolume = async () => {
        dispatch(handleSongMute(isSongMute));
    }


 

    return (
        <LinearGradient
            // Background Linear Gradient
            colors={['#DA4453', '#89216B', "#000000"]}
            style={{ height: "100%", width: "100%" }}>


            <ModalContent style={styles.modalContent}>

                <View style={styles.container}>

                    <View style={styles.headerContainer}>
                        <Pressable onPress={() => setIsSongModalVisible(!isSongModalVisible)}>
                            <Entypo name="chevron-down" size={customModerateScale(28)} color="#fff" />
                        </Pressable>


                        <MaterialCommunityIcons name="dots-horizontal" size={customModerateScale(28)} color="#fff" />
                    </View>


                    <Image style={styles.songImg} source={require('../../../assets/images/cover.jpg')} />

                    <View style={styles.artistContainer}>
                        <View style={{ alignItems: "flex-start", width: "90%" }}>
                            <Text numberOfLines={1} style={[styles.textColor, { fontWeight: "500", fontSize: 18 }]}>{currentSong?.title}</Text>
                            {/* <Text style={[styles.textColor, { fontSize: 13, color: Colors.main.grey }]}>{song?.title}</Text> */}
                        </View>
                        <Pressable onPress={() => { currentSong ? dispatch(toggleFavouriteSong(currentSong)) : null }}>
                            <MaterialIcons
                                name={isFavourite ? "favorite" : "favorite-border"}
                                size={24}
                                color={Colors.main.white}
                            />
                        </Pressable>

                    </View>

                    <View style={{ marginTop: customModerateScale(20) }}>


                        <Slider
                            minimumTrackTintColor='#fff'
                            maximumTrackTintColor='#fff'
                            thumbTintColor="#fff"
                            value={position}
                            maximumValue={duration}
                            onValueChange={value => onSliderValueChange(value)}
                        />


                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                            <Text style={{ color: "#fff" }}>
                                {trackPosition}
                            </Text>


                            <Text style={{ color: "#fff" }}>
                                {trackDuration}
                            </Text>
                        </View>

                        <View style={styles.songControlContainer}>


                            <Pressable onPress={handleRepeatMode} >
                                <MaterialCommunityIcons name={getRepeatIcon()} size={20} color={"#ffff"} />
                            </Pressable>

                            <Pressable onPress={previousSong}>
                                <MaterialIcons name="skip-previous" size={50} color="#fff" />
                            </Pressable>

                            <Pressable >

                                {playerState == "playing" || playerState == "buffering" ? <MaterialIcons name="pause-circle-filled" size={80} color="#fff" onPress={() => playPause(currentSong)} /> : <MaterialIcons name="play-circle-filled" size={80} color="#fff" onPress={() => playPause(currentSong)} />}

                            </Pressable>


                            <TouchableOpacity activeOpacity={1} onPress={nextSong} >
                                <MaterialIcons name="skip-next" size={50} color="#fff" />
                            </TouchableOpacity>
                            <Pressable onPress={handleRestartSong}>
                                <FontAwesome6 name="rotate-left" size={20} color="#fff" />

                            </Pressable>
                        </View>


                        <View style={styles.bottomContainer}>
                            <Pressable onPress={() => handleVolume()}>

                                <Ionicons name={isSongMute ? 'volume-mute-outline' : 'volume-high-outline'} size={customModerateScale(20)} color="#fff" />
                            </Pressable>
                            {/* <Ionicons name="volume-mute-outline" size={customModerateScale(20)} color="#fff" /> */}

                            <Entypo name="share" size={customModerateScale(20)} color="#fff" onPress={() => shareMusic(currentSong)} />
                        </View>
                    </View>
                </View>
            </ModalContent>
        </LinearGradient>
    )
}

export default MusicPlayer

const styles = StyleSheet.create({
    modalContent: {
        // height: "100%", backgroundColor: Colors.main.lightRed,
        width: "100%"
    },
    container: {
        // flex: 1,
        width: "100%",
        marginBottom: customScale(15),
        marginTop: 10

    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10
    },

    songImg: {
        height: customVerticalScale(390),
        width: "100%",
        resizeMode: "cover",
        borderRadius: 7
    },

    textColor: {
        color: "#FFF"
    },
    artistContainer: {
        flexDirection: "row", justifyContent: "space-between",
        marginTop: customModerateScale(15),
        alignItems: "flex-start"
    },

    songControlContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: customModerateScale(10),
        alignItems: "center",
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: customModerateScale(20),
    }
})