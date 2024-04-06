import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface SettingState {
    colorScheme: TColorScheme
}

const initialState: SettingState = {
    colorScheme: 'dark',
}

export const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        setColorScheme: (state, action: PayloadAction<TColorScheme>) => {
            state.colorScheme = action.payload
        },
        reset: (state) => {
            state = {
                ...initialState,
            }
        }
    },
})

export const {reset, setColorScheme} = settingSlice.actions
