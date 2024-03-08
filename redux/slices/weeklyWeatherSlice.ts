import { createSlice,PayloadAction } from "@reduxjs/toolkit";

type dayWeather = {
    day:number,
    status:string,
    maxTemp:number,
    minTemp:number
}

export type WeeklyWeatherState = {
    day0:dayWeather,
    day1:dayWeather,
    day2:dayWeather,
    day3:dayWeather,
    day4:dayWeather,
    day5:dayWeather,
    day6:dayWeather,
}
type InitialState = {
    value: WeeklyWeatherState
}
const sampleDay = {
    day:1709879400,
    status:"Sunny",
    maxTemp:294.02,
    minTemp:306.93
}

const initialState = {
    value:{
        day0:sampleDay,
        day1:sampleDay,
        day2:sampleDay,
        day3:sampleDay,
        day4:sampleDay,
        day5:sampleDay,
        day6:sampleDay,
    }
} as InitialState

export const weeklyWeather = createSlice({
    name: "unit",
    initialState,
    reducers: {
        changeWeeklyWeather: (state,action:PayloadAction<WeeklyWeatherState>) => {
            return {
                value:action.payload
            }
        }
    }
})

export const {changeWeeklyWeather} = weeklyWeather.actions
export default weeklyWeather.reducer