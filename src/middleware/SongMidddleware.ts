import { RootState } from "../store/Strore"

const unloadSong = store => next => async action => {

    console.log(action.type);
    if (action.type == "audio/playPauseToggle/fulfilled") {

        const state = store.getState() as RootState

        let { isPlaying, song, songUri } = state.player
        if (song) {
            // await song.unloadAsync();
        }

    }

    next(action)
}

export default unloadSong