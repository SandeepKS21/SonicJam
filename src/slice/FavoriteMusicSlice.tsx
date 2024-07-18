import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { RootState } from '../store/Strore';
import { Sound } from 'expo-av/build/Audio';
import { SongDetails } from '../Interface/songInterface';
import { validatePathConfig } from '@react-navigation/native';

interface FavoritesState {
    favoriteSong: SongDetails[];
}

const initialState: FavoritesState = {
    favoriteSong: [],
};




export const favoriteSpice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {

        setFavorites: (state, action: PayloadAction<SongDetails>) => {

            const index = state.favoriteSong.findIndex((song) => song.uri === action.payload.uri);


            if (index === -1) {
                // song not found
                state.favoriteSong.push(action.payload)
            } else {

                state.favoriteSong.splice(index, 1);
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setFavorites } = favoriteSpice.actions
export const favoriteSong = (state: RootState) => state.favorites.favoriteSong;


export default favoriteSpice.reducer