import {configureStore} from '@reduxjs/toolkit'
import unitReducer from './slices/unitSlice'
import { TypedUseSelectorHook, useSelector } from "react-redux"
export const store = configureStore({
    reducer:{
        unitReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector