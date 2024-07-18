import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { loadingInterface, playlistInterface, songInterface } from '../Interface/songInterface'
import TrackPlayer, { Capability, Event, RepeatMode, State, Track, useTrackPlayerEvents } from 'react-native-track-player';
import { RootState } from '../store/Strore';
import { getPlaybackState } from 'react-native-track-player/lib/src/trackPlayer';
import { getData, storeData } from '../utils/localStorage';
import { ImageSourcePropType } from 'react-native';



export interface musicState {
    state: State,
    trackIndex: number | null,
    isPlaying: string,
    activeTrack: songInterface | null,
    repeatMode: string,
    isSongMute: boolean,
    favouriteSong: songInterface[],
    playlist: playlistInterface[];
    playlistName: string[];
    singlePlaylist: playlistInterface | null
    loading: loadingInterface;
    currentPlaylistName: string | null,
    recentlyPlayed: songInterface[],
    backgroundTheme: ImageSourcePropType
}

const initialState: musicState = {
    state: State.None,
    trackIndex: null,
    activeTrack: null,
    isPlaying: "",
    repeatMode: "Queue",
    isSongMute: false,
    favouriteSong: [],
    playlist: [],
    playlistName: [],
    loading: {
        playlist: false
    },
    singlePlaylist: null,
    currentPlaylistName: null,
    recentlyPlayed: [],
    backgroundTheme: require('../../assets/background/clouds/c1.jpg')
}


export const playPauseToggle = createAsyncThunk('playPauseToggle', async ({ song, playlistName }: { song: songInterface, playlistName?: string }, { getState, dispatch }) => {
    try {
        const currentState = getState() as RootState;
        const activeTrack = currentState.player.activeTrack;

        let { state } = await getPlaybackState();
        const currentTrack = await TrackPlayer.getActiveTrack();

        console.log('currentPlaylistName', currentState.player.currentPlaylistName);
        console.log('upcoming playlist', playlistName);
        // set new playlist
        if (playlistName !== undefined && playlistName) {
            if (playlistName !== "library" && playlistName !== currentState.player.currentPlaylistName) {


                if (playlistName === "favorite") {

                    const response = await dispatch(loadFavouriteSong());
                    const favoriteSong = response.payload as songInterface[];

                    if (favoriteSong && favoriteSong.length > 0) {
                        await TrackPlayer.reset();
                        await TrackPlayer.add(favoriteSong);
                        dispatch(setCurrentPlaylistName(playlistName));
                    }

                } else {
                    const response = await dispatch(getPlaylistByName(playlistName));
                    const playlistSong = response.payload as playlistInterface;

                    if (playlistSong.song.length > 0) {
                        await TrackPlayer.reset();
                        await TrackPlayer.add(playlistSong.song);
                        dispatch(setCurrentPlaylistName(playlistName));
                    }
                }
            }





        } else {

       
            if (currentState.player.currentPlaylistName !== "library") {

                if (currentState.file.songList?.length && currentState.file.songList?.length > 0) {
                    await TrackPlayer.reset();
                    await TrackPlayer.add(currentState.file.songList);
                    dispatch(setCurrentPlaylistName("library"));
                }

            }

        }

console.log('state',state);

        const queue = await TrackPlayer.getQueue();
        const requestedTrackIndex = queue.findIndex(track => track.id === song.id);
        const currentTrackIndex = queue.findIndex(track => track.id === currentTrack?.id);

        if (state === State.Buffering) {
            if (requestedTrackIndex) {
                await TrackPlayer.skip(requestedTrackIndex);
                await TrackPlayer.play();
            } else {
                await TrackPlayer.play();
            }
        }


        if (state === State.Ready || state === State.Stopped ||state===State.None) {
            if (activeTrack) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.skip(requestedTrackIndex);
                await TrackPlayer.play();
            }
        }




        if (state == State.Playing || state == State.Paused) {

            if (state === State.Playing) {
                if (currentTrackIndex == requestedTrackIndex) {
                    await TrackPlayer.pause();
                } else {
                    await TrackPlayer.pause();
                    await TrackPlayer.skip(requestedTrackIndex)
                    await TrackPlayer.play();
                }
            } else {

                if (currentTrackIndex == requestedTrackIndex) {
                    await TrackPlayer.play();
                } else {
                    await TrackPlayer.skip(requestedTrackIndex)
                    await TrackPlayer.play();
                }

            }
        }


        dispatch(getPlayingStatus());
        dispatch(getActiveTrack());


        return true;
    } catch (error) {
        console.log('error while playing music', error)
    }

});


export const getActiveTrack = createAsyncThunk('player/currentTrack', async (_, { rejectWithValue, dispatch }) => {
    try {
        let currentTrack = await TrackPlayer.getActiveTrack();

        // console.log(currentTrack)
        if (currentTrack !== undefined) {
            const currentSong: songInterface = {
                id: currentTrack.id,
                title: currentTrack.title || "",
                artist: currentTrack.artist || "",
                artwork: currentTrack.artwork || "",
                url: currentTrack.url || "",
            };
            dispatch(setActiveTrack(currentSong));
            dispatch(storeRecentlyPlayedSong(currentSong));

        }

    }
    catch (error) {
        rejectWithValue('error while fetching current track');
        console.log('error while fetching current track', error)
    }
});



export const getPlayingStatus = createAsyncThunk('player/currentTrack', async (_, { rejectWithValue, dispatch }) => {
    try {

        const { state } = await getPlaybackState();
        dispatch(setPlayingStatus(state));
    }
    catch (error) {
        rejectWithValue('error while fetching current track');
        console.log('error while fetching current track', error)
    }
});

export const skipToNext = createAsyncThunk('player/skipToNext', async (_, { dispatch }) => {

    try {
        await TrackPlayer.skipToNext();
        dispatch(getActiveTrack());
    } catch (error) {
        console.log('error while playing next track', error);
    }
});

export const skipToPreviousTrack = createAsyncThunk('player/skipToPrevious', async (_, { dispatch }) => {
    try {
        await TrackPlayer.skipToPrevious();
        // dispatch(getPlayingStatus());
        dispatch(getActiveTrack());


    } catch (error) {
        console.log('error while playing next track', error);
    }
});

export const setupPlayer = createAsyncThunk('player/setupPlayer', async (_, { getState, dispatch }) => {

    try {

        const state = getState() as RootState

        const musicList = state.file.songList;

        await TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
            // Media controls capabilities
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
            ],

            // Capabilities that will show up when the notification is in the compact form on Android
            compactCapabilities: [Capability.Play, Capability.Pause],


            notificationCapabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,

            ],
            android: {
                alwaysPauseOnInterruption: true,

            }
        });

        if (musicList && musicList?.length > 0) {
            await TrackPlayer.add(musicList);
        }

    } catch (error) {
        console.log('error while initlization player', error)
    }

});

export const handelRepeatSong = createAsyncThunk('player/handelRepeatSong', async (repeadMode: string | undefined, { }) => {

    try {

        if (repeadMode === "Track") {
            await TrackPlayer.setRepeatMode(RepeatMode.Track);
        } else if (repeadMode === "Queue") {
            await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        } else {
            await TrackPlayer.setRepeatMode(RepeatMode.Off);
        }


        return repeadMode;


    } catch (error) {
        console.log('error while handeling repeat song', error);
    }

});


export const handleSongMute = createAsyncThunk('player/handleSongMute', async (isSongMute: boolean, { }) => {

    try {
        await TrackPlayer.setVolume(isSongMute ? 1 : 0);
        return !isSongMute;
    } catch (error) {
        console.log('error while handeling repeat song', error);
    }

});

export const toggleFavouriteSong = createAsyncThunk('player/toggleFavouriteSong', async (song: songInterface, { getState, rejectWithValue }) => {
    try {

        const state = getState() as RootState;

        let favouriteSong = [...state.player.favouriteSong];

        const index = favouriteSong.findIndex((favouriteSong: songInterface) => favouriteSong.title === song.title);

        if (index === -1) {
            favouriteSong.push(song);
        } else {
            favouriteSong.splice(index, 1);
        }

        // storage in local storage
        await storeData('favouriteSong', JSON.stringify(favouriteSong));

        return favouriteSong;

    } catch (error) {

        rejectWithValue('Error while fetching favourite song');
        console.log('Error while saving favourite song', error);
    }
})

export const loadFavouriteSong = createAsyncThunk('player/loadFavouriteSong', async () => {
    try {
        const data = await getData('favouriteSong');

        let favouriteSong: songInterface[] = [];
        if (data) {
            favouriteSong = JSON.parse(data);
        }
        return favouriteSong;

    } catch (error) {
        console.log('Error while fetching favourite song', error);
    }
});



export const getAllPlaylist = createAsyncThunk('player/getAlPlaylist', async (_, { rejectWithValue }) => {

    try {
        const playlist = await getData('playlist');
        const playlistData: playlistInterface[] = playlist ? JSON.parse(playlist) as playlistInterface[] : [];
        return playlistData;


    } catch (error) {
        rejectWithValue('error while fetching all playlist');
        console.log('error while fetching all playlist', error);
    }

});

export const createPlaylistName = createAsyncThunk('player/createPlaylistName', async (playlist: playlistInterface, { rejectWithValue, dispatch }) => {
    try {
        const response = await dispatch(getAllPlaylist());

        const allPlaylist = response.payload as playlistInterface[];
        const updatedPlaylist = [...allPlaylist, playlist];
        await storeData('playlist', JSON.stringify(updatedPlaylist));
        await dispatch(getAllPlaylist());

    } catch (error) {
        rejectWithValue('error while creating playlist name');
        console.log('error while creating playlist name', error);
    }

});

export const addPlaylist = createAsyncThunk('player/createPlaylist', async (playlist: playlistInterface, { dispatch, rejectWithValue }) => {

    try {

        const storePlaylist = async (data: playlistInterface[]) => {
            await storeData('playlist', JSON.stringify(data));
        }
        let updatedPlaylist;
        const response = await dispatch(getAllPlaylist());
        const allPlaylist = response.payload as playlistInterface[];

        const playlistIndex = allPlaylist.findIndex(p => p.playlistName === playlist.playlistName);

        // allPlaylist[playlistIndex] = playlist;

        updatedPlaylist = [
            ...allPlaylist.slice(0, playlistIndex),
            playlist,
            ...allPlaylist.slice(playlistIndex + 1)
        ];

        await storePlaylist(updatedPlaylist);
        await dispatch(getAllPlaylist());
        await dispatch(getPlaylistByName(playlist.playlistName));
        return true;

    } catch (error) {
        console.log('error while creating playlist', error);
    }

});


export const getPlaylistByName = createAsyncThunk('player/getPlaylist', async (playlistName: string, { dispatch }) => {
    try {

        const response = await dispatch(getAllPlaylist());
        const allPlaylist = response.payload as playlistInterface[];

        const filteredPlaylist = allPlaylist.find((playlist) => playlist.playlistName === playlistName);
        return filteredPlaylist;

    } catch (error) {
        console.log('error while fetching playlist', error);
    }

});

export const storeRecentlyPlayedSong = createAsyncThunk('player/storeRecentlyPlayedSong', async (newSong: songInterface, { rejectWithValue, getState }) => {
    try {

        const state = getState() as RootState;
        const allRecentlyPlayedSongs = state.player.recentlyPlayed;
        const songExists = allRecentlyPlayedSongs.find((song) => song.id === newSong.id);

        let updatedRecentlyPlayed = [...allRecentlyPlayedSongs];

        if (!songExists) {
            if (updatedRecentlyPlayed.length >= 6) {
                updatedRecentlyPlayed.pop(); // Remove the last item
            }
            updatedRecentlyPlayed = [newSong, ...updatedRecentlyPlayed];
        }

        // store in local storage
        await storeData('recentlyPlayedSong', JSON.stringify(updatedRecentlyPlayed))
        return updatedRecentlyPlayed;

    } catch (error) {
        console.log('error while saving recently played song', error);
    }

});


export const getRecentlyPlayedSong = createAsyncThunk('player/getRecentlyPlayedSong', async () => {

    try {

        const recentlyPlayed = await getData('recentlyPlayedSong');
        const recentlyPlayedSong: songInterface[] = recentlyPlayed ? JSON.parse(recentlyPlayed) as songInterface[] : [];
        return recentlyPlayedSong;

    } catch (error) {
        console.log('error while fetching recently played song', error);
    }

});

export const setTheme = createAsyncThunk('player/setTheme', async (backgroundImg: ImageSourcePropType) => {
    try {
        await storeData('theme', JSON.stringify(backgroundImg));

        return backgroundImg;
    } catch (error) {
        console.log('error while setting theme', error);
    }

});

export const getTheme = createAsyncThunk('player/getTheme', async () => {
    try {
        const themeData = await getData('theme');

        const theme: ImageSourcePropType | null = themeData ? JSON.parse(themeData) as ImageSourcePropType : null;
        return theme;

        // return backgroundImg;
    } catch (error) {
        console.log('error while setting theme', error);
    }

});


export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayingStatus: (state, action: PayloadAction<string>) => {
            state.isPlaying = action.payload;
        },
        setActiveTrack: (state, action: PayloadAction<songInterface | null>) => {
            state.activeTrack = action.payload;
        },
        clearSinglePlaylistData: (state) => {
            state.singlePlaylist = null;

        },
        setCurrentPlaylistName: (state, action: PayloadAction<string>) => {
            state.currentPlaylistName = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(handelRepeatSong.fulfilled, (state, action: PayloadAction<string | undefined>) => {
                if (action.payload !== undefined) {
                    state.repeatMode = action.payload;
                }
            })
            .addCase(handleSongMute.fulfilled, (state, action: PayloadAction<boolean | undefined>) => {
                if (action.payload !== undefined) {
                    state.isSongMute = action.payload;
                }
            })
            .addCase(toggleFavouriteSong.fulfilled, (state, action: PayloadAction<songInterface[] | undefined>) => {
                if (action.payload) {
                    state.favouriteSong = action.payload;
                }
            })
            .addCase(loadFavouriteSong.fulfilled, (state, action: PayloadAction<songInterface[] | undefined>) => {
                if (action.payload) {
                    state.favouriteSong = action.payload;
                }
            }).addCase(addPlaylist.pending, (state,) => {
                state.loading.playlist = true;
            }).addCase(addPlaylist.fulfilled, (state,) => {
                state.loading.playlist = false;
            })
            .addCase(getAllPlaylist.fulfilled, (state, action: PayloadAction<playlistInterface[] | undefined>) => {
                state.loading.playlist = false;
                if (action.payload) state.playlist = action.payload;
            })
            .addCase(getPlaylistByName.fulfilled, (state, action: PayloadAction<playlistInterface | undefined>) => {
                state.loading.playlist = false;
                if (action.payload) state.singlePlaylist = action.payload;

            }).addCase(storeRecentlyPlayedSong.fulfilled, (state, action: PayloadAction<songInterface[] | undefined>) => {
                if (action.payload) state.recentlyPlayed = action.payload;
            }).addCase(getRecentlyPlayedSong.fulfilled, (state, action: PayloadAction<songInterface[] | undefined>) => {
                if (action.payload) state.recentlyPlayed = action.payload;
            }).addCase(setTheme.fulfilled, (state, action: PayloadAction<ImageSourcePropType | undefined>) => {
                if (action.payload) state.backgroundTheme = action.payload
            }).addCase(getTheme.fulfilled, (state, action: PayloadAction<ImageSourcePropType | undefined | null>) => {
                if (action.payload) state.backgroundTheme = action.payload
            })
    }
});



export const { setPlayingStatus, setActiveTrack, clearSinglePlaylistData, setCurrentPlaylistName } = playerSlice.actions

export const isPlaying = (state: RootState) => state.player.isPlaying;
export const activeTrack = (state: RootState) => state.player.activeTrack;
export const repeatMode = (state: RootState) => state.player.repeatMode;
export const isAudioMute = (state: RootState) => state.player.isSongMute;
export const favouriteSong = (state: RootState) => state.player.favouriteSong;
export const playlist = (state: RootState) => state.player.playlist;
export const playlistNames = (state: RootState) => state.player.playlistName;
export const singlePlaylist = (state: RootState) => state.player.singlePlaylist;
export const currentPlaylistName = (state: RootState) => state.player.currentPlaylistName;
export const backgroundTheme = (state: RootState) => state.player.backgroundTheme;



export default playerSlice.reducer;