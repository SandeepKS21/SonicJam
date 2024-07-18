import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ReusableHeader from '@/src/components/Header/ReusableHeader'
import { useLocalSearchParams } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/store/Strore';
import { activeTrack, clearSinglePlaylistData, getPlaylistByName, playlist, playPauseToggle, singlePlaylist } from '@/src/feature/playerSlice';
import { useSelector } from 'react-redux';
import { songInterface } from '@/src/Interface/songInterface';
import SongList from '@/src/components/SongList';
import ReusableLoader from '@/src/components/ReusableLoader';
import BackgroundImage from '@/src/components/BackgroundImage';
import BottomSongBar from '@/src/components/Music/BottomSongBar';
import { customModerateScale } from '@/src/constants/Style';

type playlistType = {
    playlistName: string
}

const PlaylistSongs = () => {

    const { playlistName } = useLocalSearchParams<playlistType>();
    const dispatch = useDispatch<AppDispatch>();
    const playlistData = useSelector(singlePlaylist);
    const currentSong = useSelector(activeTrack);
   

    const searchSoong = (search: string) => {
        // debouncedSearch(search);
        // setSearchTerm(search);
    }

    const handlePlayPause = useCallback(
        (song: songInterface) => {
            dispatch(playPauseToggle({ song, playlistName: playlistName }));
        },
        [dispatch],
    );


    useEffect(() => {
        dispatch(getPlaylistByName(playlistName));

        return () => {
            dispatch(clearSinglePlaylistData());
        }
    }, [playlistName]);




    const renderItem = useCallback(
        ({ item }: { item: songInterface }) => (

            <SongList song={item} currentSong={currentSong?.title == item.title} handlePlayPause={handlePlayPause} />
        ),
        [currentSong]
    );

    if (!playlistData) {
        return (
            <ReusableLoader />
        );
    }


    return (
        <BackgroundImage>
            <ReusableHeader title={playlistName} searchSong={searchSoong} />
            <BottomSongBar />
            <View style={styles.conatiner}>

               
                <View style={{ flex: 1 }}>

                    <FlatList showsVerticalScrollIndicator={true} data={playlistData?.song} keyExtractor={(item: any) => item.id} initialNumToRender={20} maxToRenderPerBatch={20} windowSize={21} renderItem={renderItem} />

                </View>
            </View>

        </BackgroundImage>


    )
}

export default PlaylistSongs

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        paddingHorizontal: customModerateScale(5),
        paddingLeft: customModerateScale(15),
    },

})