import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    phone: '',
    operator: '',
    minutes: 0,
    gigabytes: 0,
    router: '',
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
})

export const configuratorActions = configuratorSlice.actions
export const configuratorReducer = configuratorSlice.reducer
