import { IConfiguratorSchema } from './../schema/configuratorSchema'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchConfiguratorData } from '../services/fetchConfiguratorData'

const initialState: IConfiguratorSchema = {
    phone: '',
    operator: '',
    minutes: 0,
    gigabytes: 0,
    socialMedia: '',
    router: '',
    data: null,
}

const configuratorSlice = createSlice({
    name: 'configurator',
    initialState,
    reducers: {
        setPhone(state, action: PayloadAction<string>) {
            state.phone = action.payload
        },
        setRouter(state, action: PayloadAction<string>) {
            state.router = action.payload
        },
        setOperator(state, action: PayloadAction<string>) {
            state.operator = action.payload
        },
        setMinutes(state, action: PayloadAction<number>) {
            state.minutes = action.payload
        },
        setGigabytes(state, action: PayloadAction<number>) {
            state.gigabytes = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConfiguratorData.pending, (state) => {})
            .addCase(fetchConfiguratorData.rejected, (state) => {})
            .addCase(fetchConfiguratorData.fulfilled, (state, action) => {
                state.data = action.payload
            })
    },
})

export const configuratorActions = configuratorSlice.actions
export const configuratorReducer = configuratorSlice.reducer
