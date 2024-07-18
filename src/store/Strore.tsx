import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../feature/playerSlice';
import fileReducer from '../feature/fileSlice';
export const store = configureStore({
    reducer: {
        player: playerReducer,
        file: fileReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch