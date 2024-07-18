import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Audio } from 'expo-av';
import { RootState } from '../store/Strore';
import { Sound } from 'expo-av/build/Audio';
import { SongDetails, songList } from '../Interface/songInterface';

export interface CounterState {
    value: number,
    song: Audio.Sound | null,
    isPlaying: boolean,
    songUri: string | null,
    songDetails: SongDetails,
    musicFile: any[],
    currentSongIndex: number | null,
    isRepeat: boolean,
    recentlyPlayed: songList[]
}


const initialState: CounterState = {
    value: 0,
    song: null,
    isPlaying: false,
    songUri: null,
    songDetails: {
        songName: "",
        artistName: "",
        coverImg: "https://images.unsplash.com/photo-1598387993640-1eda0d648fda?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    musicFile: [],
    currentSongIndex: null,
    isRepeat: false,
    recentlyPlayed: []
}


// export const playPauseToggle = createAsyncThunk(
//     'audio/playPauseToggle',
//     async (songInfo: SongDetails, { getState, dispatch }) => {
//         const state = getState() as RootState
//         let { isPlaying, song, songUri } = state.player


//         if (song && songInfo.uri === songUri) {

//             if (songInfo.songName) {
//                 dispatch(setSongDetails({
//                     uri: songInfo.uri,
//                     songName: songInfo.songName,
//                     artistName: "Honey Singh",
//                     coverImg: ""
//                 }))
//             }


//             if (isPlaying) {
//                 await song.pauseAsync();
//                 dispatch(setPlaying(false));
//             } else {
//                 await song.playAsync();
//                 dispatch(setPlaying(true));
//             }
//         } else {

//             if (songInfo.songName) {
//                 dispatch(setSongDetails({
//                     uri: songInfo.uri,
//                     songName: songInfo.songName,
//                     artistName: "Honey Singh",
//                     coverImg: ""
//                 }))
//             }

//             const { sound: newSound } = await Audio.Sound.createAsync({ uri: songInfo.uri }, { shouldPlay: true });


//             if (song) {
//                 await song.unloadAsync();  // unload previous sound
//             }
//             dispatch(setSong(newSound));
//             dispatch(setSongUri(songInfo.uri));
//             await newSound.playAsync();
//             dispatch(setPlaying(true));
//             dispatch(recentlyPlayedSong({
//                 uri: songInfo.uri,
//                 filename: songInfo.songName,
//                 artist: "Honey Singh",
//                 image: "",
//                 id: songInfo.id || 1
//             }))
//         }

//         if (songInfo.uri !== songUri) {
//             dispatch(getCurrentSongIndex(songInfo.uri))

//         }
//     }
// );




export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {

        setPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },

        setSong: (state, action: PayloadAction<Audio.Sound | null>) => {
            state.song = action.payload;
        },
        setSongUri: (state, action: PayloadAction<string | any>) => {
            state.songUri = action.payload
        },

        setSongDetails: (state, action: PayloadAction<SongDetails>) => {
            state.songDetails.uri = action.payload.uri;
            state.songDetails.songName = action.payload.songName;
            state.songDetails.artistName = action.payload.artistName;
            state.songDetails.coverImg = "https://images.unsplash.com/photo-1598387993640-1eda0d648fda?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        },

        setMusicFiles: (state, action: PayloadAction<any[]>) => {
            state.musicFile = action.payload;
        },
        playNextSong: (state, action: PayloadAction<string>) => {
            // console.log('object', action.payload);
        },

        getCurrentSongIndex: (state, action: PayloadAction<string | undefined>) => {
            const currentSongIndex = state.musicFile.findIndex((song) => song.uri === action.payload);
            state.currentSongIndex = currentSongIndex !== -1 ? currentSongIndex : null;
        },

        toggleRepeat: (state) => {
            state.isRepeat = !state.isRepeat;
        },
        recentlyPlayedSong: (state, action: PayloadAction<songList>) => {

            const index = state.recentlyPlayed.findIndex(song => song.uri === action.payload.uri);

            if (index === -1) {
                state.recentlyPlayed.unshift(action.payload);
                state.recentlyPlayed = state.recentlyPlayed.slice(0, 3);
            }

        }

    },
})

// Action creators are generated for each case reducer function
export const { setPlaying, setSong, setSongUri, setSongDetails, playNextSong, setMusicFiles, getCurrentSongIndex, toggleRepeat, recentlyPlayedSong } = playerSlice.actions
export const isPlaying = (state: RootState) => state.player.isPlaying;
export const song = (state: RootState) => state.player.song;
export const songDetails = (state: RootState) => state.player.songDetails;
export const songUri = (state: RootState) => state.player.songUri;
export const musicFile = (state: RootState) => state.player.musicFile;
export const currentSongIndex = (state: RootState) => state.player.currentSongIndex
export const isRepeat = (state: RootState) => state.player.isRepeat
export const recentlyPlayed = (state: RootState) => state.player.recentlyPlayed

export default playerSlice.reducer