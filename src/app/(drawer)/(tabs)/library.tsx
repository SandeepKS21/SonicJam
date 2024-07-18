import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, ImageBackground, RefreshControl } from 'react-native';
import SongList from '@/src/components/SongList';
import { useSelector } from 'react-redux';
import Colors from '@/src/constants/Colors';
import { loadMusicFiles, loadNewMusicFiles, musicFile } from '@/src/feature/fileSlice';
import ReusableHeader from '@/src/components/Header/ReusableHeader';
import { songInterface } from '@/src/Interface/songInterface';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/store/Strore';
import { activeTrack, playPauseToggle } from '@/src/feature/playerSlice';
import useMusicPlayerEvents from '@/src/hooks/useMusicPlayerEvents';
import { customModerateScale, customVerticalScale } from '@/src/constants/Style';
import debounce from 'lodash.debounce';
import BackgroundImage from '@/src/components/BackgroundImage';
import ReusableLoader from '@/src/components/ReusableLoader';


const Library = () => {

  // music player event
  useMusicPlayerEvents();

  const musicFiles = useSelector(musicFile);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredMusicFiles, setFilteredMusicFiles] = useState<songInterface[] | null>(musicFiles);


  const dispatch = useDispatch<AppDispatch>();
  const currentSong = useSelector(activeTrack);

  const handlePlayPause = useCallback(
    (song: songInterface) => {
      dispatch(playPauseToggle({ song }));
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

  const renderItem = useCallback(
    ({ item }: { item: songInterface }) => (

      <SongList song={item} currentSong={currentSong?.title == item.title} handlePlayPause={handlePlayPause} />
    ),
    [currentSong]
  )

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(loadNewMusicFiles());
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    }
  }, [debouncedSearch]);


  useEffect(() => {
    const loadfiles = async () => {
      await dispatch(loadMusicFiles());
    }

    if (!musicFiles || musicFiles.length == 0) {
      loadfiles();
    }
  }, []);


  useEffect(() => {
    setFilteredMusicFiles(musicFiles)
  }, [musicFiles]);




  if (!musicFiles || musicFiles?.length === 0) {
    return <ReusableLoader />
  }

  return (

    <View style={{ flex: 1 }}>

      <BackgroundImage >
        <ReusableHeader title='Library' searchSong={searchSong} />
        <View style={styles.container}>
          <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={true} data={filteredMusicFiles} keyExtractor={(item: any) => item.id} initialNumToRender={20} maxToRenderPerBatch={20} windowSize={21} renderItem={renderItem} extraData={currentSong} />
        </View>
      </BackgroundImage>
    </View>


  );
};

export default Library;

const styles = StyleSheet.create({

  safeAreaContainer: {
    flex: 1,
    marginTop: 10,
  },

  container: {
    paddingHorizontal: customModerateScale(5),
    paddingLeft: customModerateScale(15),
    flex: 1,
    marginTop: customVerticalScale(5),
  }

});