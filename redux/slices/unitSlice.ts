import { createSlice,PayloadAction } from "@reduxjs/toolkit";

type UnitState = {
    isFarenheit: boolean
}
type InitialState = {
    value: UnitState
}

const initialState = {
    value:{
        isFarenheit:true
    }
} as InitialState

export const unit = createSlice({
    name: "unit",
    initialState,
    reducers: {
        changeUnit: (state) => {
            state.value.isFarenheit = !state.value.isFarenheit
        }
        // changeUnit: (state,action:PayloadAction<boolean>) => {
        //     return {
        //         value:{
        //             isFarenheit: action.payload
        //         }
        //     }
        // }
    }
})

export const {changeUnit} = unit.actions
export default unit.reducer