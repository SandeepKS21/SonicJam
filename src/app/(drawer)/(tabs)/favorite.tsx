import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import BackgroundImage from '@/src/components/BackgroundImage'
import ReusableHeader from '@/src/components/Header/ReusableHeader'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { customModerateScale, customVerticalScale } from '@/src/constants/Style'
import { debounce } from 'lodash'
import useMusicPlayerEvents from '@/src/hooks/useMusicPlayerEvents'
import { useSelector } from 'react-redux'
import { songInterface } from '@/src/Interface/songInterface'
import { loadMusicFiles, loadNewMusicFiles, musicFile } from '@/src/feature/fileSlice'
import { useDispatch } from 'react-redux'
import { activeTrack, favouriteSong, loadFavouriteSong, playPauseToggle } from '@/src/feature/playerSlice'
import { AppDispatch } from '@/src/store/Strore'
import ReusableLoader from '@/src/components/ReusableLoader'
import SongList from '@/src/components/SongList'

const Favorite = () => {

    useMusicPlayerEvents();

    const musicFiles = useSelector(favouriteSong);
    const [refreshing, setRefreshing] = useState(false);
    const [filteredMusicFiles, setFilteredMusicFiles] = useState<songInterface[] | null>(musicFiles);


    const dispatch = useDispatch<AppDispatch>();
    const currentSong = useSelector(activeTrack);

    const handlePlayPause = useCallback(
        (song: songInterface) => {
            console.log('song', song)
            dispatch(playPauseToggle({ song: song, playlistName: "favorite" }));
        },
        [dispatch],
    );


    const debouncedSearch = useCallback(
        debounce((search: string) => {

            const filteredSong = musicFiles?.filter((song: songInterface) => song.title.toLowerCase().includes(search.toLowerCase()));

            if (filteredSong) {
                setFilteredMusicFiles(filteredSong);

            }
        }, 400),
        [musicFiles]
    );

    const searchSong = (search: string) => {
        debouncedSearch(search);
    }
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        }
    }, [debouncedSearch]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(loadNewMusicFiles());
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);



    useEffect(() => {
        const loadfiles = async () => {
            await dispatch(loadFavouriteSong());
        }

        if (!musicFiles || musicFiles.length == 0) {
            loadfiles();
        }
    }, []);


    useEffect(() => {
        setFilteredMusicFiles(musicFiles)
    }, [musicFiles]);



    const renderItem = useCallback(
        ({ item }: { item: songInterface }) => (

            <SongList song={item} currentSong={currentSong?.title == item.title} handlePlayPause={handlePlayPause} />
        ),
        [currentSong]
    );

    if (!musicFiles || musicFiles?.length === 0) {
        return <BackgroundImage>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text style={{ color: "#fff", fontSize: 18 }}>No favourite song found</Text></View>
        </BackgroundImage>

    }

    return (
        <View style={{ flex: 1 }}>

            <BackgroundImage >
                <ReusableHeader title='Favorite' searchSong={searchSong} />
                <View style={styles.container}>
                    <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={true} data={filteredMusicFiles} keyExtractor={(item: any) => item.id} initialNumToRender={20} maxToRenderPerBatch={20} windowSize={21} renderItem={renderItem} extraData={currentSong} />
                </View>
            </BackgroundImage>
        </View>

    )
}

export default Favorite

const styles = StyleSheet.create({

    safeAreaContainer: {
        flex: 1,
        marginTop: 10,
    },

    container: {
        paddingHorizontal: customModerateScale(5),
        paddingLeft: customModerateScale(15),
        flex: 1,
        marginTop: customVerticalScale(5)
    }

})