import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export type CurrentHighlightsState = {
    uvIndex:number,
    windSpeed:number,
    windDirection:string,
    sunrise:number,
    sunset:number,
    humidity:number,
    visibility:number,
    airQuality:number
}
type InitialState = {
    value: CurrentHighlightsState
}

const initialState = {
    value:{
        uvIndex:5,
        windSpeed:5.5,
        windDirection:"WSW",
        sunrise:1709860715,
        sunset:1709903567,
        humidity:27,
        visibility:5.2,
        airQuality:105
    }
} as InitialState

export const currentHighlights = createSlice({
    name: "unit",
    initialState,
    reducers: {
        changeCurrentHighlights: (state,action:PayloadAction<CurrentHighlightsState>) => {
            return {
                value:action.payload
            }
        }
    }
})

export const {changeCurrentHighlights} = currentHighlights.actions
export default currentHighlights.reducer