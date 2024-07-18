import { FlatList, ImageBackground, ListRenderItem, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import AddPlaylistSongHeader from '@/src/components/Header/AddPlaylistSongHeader';
import { useSelector } from 'react-redux';
import { musicFile } from '@/src/feature/fileSlice';
import { playlistInterface, songInterface } from '@/src/Interface/songInterface';
import AddPlaylistSongList from '../../components/AddPlaylistSongList';
import { customModerateScale } from '@/src/constants/Style';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { addPlaylist } from '@/src/feature/playerSlice';
import { AppDispatch } from '@/src/store/Strore';
import BackgroundImage from '@/src/components/BackgroundImage';
type playlistType = {
    playlistName: string
}

const AddPlaylistSong = () => {


    const songList = useSelector(musicFile);
    const [filteredMusicFiles, setFilteredMusicFiles] = useState<songInterface[] | null>(songList);
    const [selectedSong, setSelectedSong] = useState<songInterface[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { playlistName } = useLocalSearchParams<playlistType>();


    const handleSelectedSong = (songName: songInterface) => {
        setSelectedSong(prevSelectedSong => {
            if (!prevSelectedSong.includes(songName)) {
                return [...prevSelectedSong, songName];
            } else {
                return prevSelectedSong.filter((song: songInterface) => song.title !== songName.title);
            }
        });
    }




    const debouneSearch = useCallback(
        debounce((search: string) => {

            const filteredSong = songList?.filter((song: songInterface) => song.title.toLowerCase().includes(search.toLowerCase()))

            if (filteredSong) {
                setFilteredMusicFiles(filteredSong)
            }

        }, 200),
        [songList]);


    const searchSong = (search: string) => {
        debouneSearch(search);
    }


    const handlePlaylist = () => {
        const playlist: playlistInterface = {
            playlistName,
            song: selectedSong
        }

        dispatch(addPlaylist(playlist)).unwrap();

        router.replace(({ pathname: '/screens/PlaylistSongs', params: { playlistName: playlistName } }));
    }
    const renderItem: ListRenderItem<songInterface> = useCallback(
        ({ item }) => {
            return <AddPlaylistSongList song={item} handleSelectedSong={handleSelectedSong} isSongSelcted={selectedSong.some(selected => selected.title === item.title)} />
        },
        [selectedSong],
    );

    return (
        <BackgroundImage >
            <AddPlaylistSongHeader playlistName={playlistName} searchSong={searchSong} selectedSongCount={selectedSong.length} addPlaylist={handlePlaylist} />

            <View style={styles.container}>
                <FlatList data={filteredMusicFiles} keyExtractor={(item: any) => item.id} initialNumToRender={20} maxToRenderPerBatch={20} windowSize={20} renderItem={renderItem} />
            </View>
        </BackgroundImage>
    )
}

export default AddPlaylistSong

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: customModerateScale(15)

    }
})