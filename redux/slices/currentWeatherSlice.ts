import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export type CurrentWeatherState = {
    location:string,
    temperature:number,
    status:string,
    humidity:number,
    image:string
}
type InitialState = {
    value: CurrentWeatherState
}

const initialState = {
    value:{
        location:"Pune, Maharashtra",
        temperature:24,
        status:"Sunny",
        humidity:25,
        image:""
    }
} as InitialState

export const currentWeather = createSlice({
    name: "unit",
    initialState,
    reducers: {
        changeCurrentWeather: (state,action:PayloadAction<CurrentWeatherState>) => {
            return {
                value:action.payload
            }
        }
    }
})

export const {changeCurrentWeather} = currentWeather.actions
export default currentWeather.reducer