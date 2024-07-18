import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import RNFS from 'react-native-fs';
import { RootState } from '../store/Strore';
import { deleteData, getData, storeData } from '../utils/localStorage';
import { songInterface } from '../Interface/songInterface';


export interface fileInterface {
    songList: songInterface[] | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null,
    permissionAlert: string | null,
    backgroundImg: string
}

const initialState: fileInterface = {
    songList: null,
    status: 'idle',
    error: null,
    permissionAlert: null,
    backgroundImg: ""

}

export const fetchMusicFile = createAsyncThunk('file/loadMusicFiles', async (_, { rejectWithValue, dispatch }) => {
    const getAudioFilesRecursive = async (directory: any) => {
        let audioFiles: any[] = [];

        try {
            if (!directory.includes('/storage/emulated/0/Android')) {
                const files = await RNFS.readDir(directory);
                for (const file of files) {
                    if (file.isFile()) {
                        const extension = file.name.split('.').pop()?.toLowerCase()??"";
                        if (['mp3', 'wav', 'm4a', 'aac'].includes(extension)) {
                            audioFiles.push(file);
                        }
                    } else if (file.isDirectory()) {

                        const subDirAudioFiles = await getAudioFilesRecursive(file.path);
                        audioFiles = audioFiles.concat(subDirAudioFiles);
                    }
                }
            }

        } catch (err) {
            console.error('Error reading directory:', err);
        }
        return audioFiles;
    };


    const requestStoragePermission = async () => {
        if (Platform.OS == "android") {

            // you don't ask for the permission if the API level is below 33 (Android 13), as Android doesn't recognize the permission for these versions.
            // if (Number(Platform.Version) >= 33) {
            //   return true;
            // }

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
                {
                    title: 'Storage Permission Needed',
                    message: 'This app needs access to your storage to read audio files',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            if (granted == PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Permisson granted');
                return true;
            } else if (granted == PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                console.log('Storage permission set to never ask again');

                dispatch(fileSlice.actions.setPermissionAlert('never_ask_again'))
                return rejectWithValue('never_ask_again')

            } else {
                console.log('Storage permission denied');
                return rejectWithValue('denied');
            }
        }

    }


    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
        return rejectWithValue('Storage permission denied or not granted');
    }

    const audioDirectory = Platform.select({
        ios: RNFS.MainBundlePath,
        android: RNFS.ExternalStorageDirectoryPath,
    });

    try {
        const audioFiles = await getAudioFilesRecursive(audioDirectory);


        audioFiles.sort((a, b) => new Date(b.mtime).getTime() - new Date(a.mtime).getTime());

        const musicFile = audioFiles.map((music: any, index: number) => {
            return {
                id: index,
                title: music.name,
                url: `file://${music.path}`,
                // artist: "The Weeknd ft. Daft Punk",
                artwork: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                duration: 411
            }
        });

        return musicFile;
    } catch (err) {
        console.error('Error reading audio files:', err);
        return [];
    }


})



export const loadMusicFiles = createAsyncThunk('file/loadMusicFiles',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            const song = await getData('musicFiles');
            if (song) {

                const parsedSong: songInterface[] = JSON.parse(song);
                return parsedSong; // Ensure to return parsedSong
            } else {

                const fetchedSong = await dispatch(fetchMusicFile()).unwrap();

                await storeData('musicFiles', JSON.stringify(fetchedSong));

                return fetchedSong;
            }
        } catch (error) {
            return rejectWithValue('Failed to load music files');
        }
    }
);


export const loadNewMusicFiles = createAsyncThunk('file/loadNewMusicFiles',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            
            const fetchedSong = await dispatch(fetchMusicFile()).unwrap();
            await deleteData('musicFiles');
            await storeData('musicFiles', JSON.stringify(fetchedSong));

            return fetchedSong;

        } catch (error) {
            return rejectWithValue('Failed to load music files');
        }
    }
);



export const fileSlice = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setPermissionAlert: (state, action: PayloadAction<'never_ask_again' | null>) => {
            state.permissionAlert = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadMusicFiles.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadMusicFiles.fulfilled, (state, action: PayloadAction<songInterface[]>) => {
                state.status = 'succeeded';
                state.songList = action.payload;
            })
            .addCase(loadMusicFiles.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload ?? 'An error occurred';;
            }).addCase(loadNewMusicFiles.fulfilled, (state, action: PayloadAction<songInterface[]>) => {
                state.status = 'succeeded';
                state.songList = action.payload;

            })

    }
})

// Action creators are generated for each case reducer function
export const { setPermissionAlert } = fileSlice.actions
export const musicFile = (state: RootState) => state.file.songList;
export const permissionAlert = (state: RootState) => state.file.permissionAlert;


export default fileSlice.reducer