import { IConfiguratorSchema } from './../schema/configuratorSchema'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchConfiguratorData } from '../services/fetchConfiguratorData'
import { filterPhoneNumber } from '@/shared/lib/filterPhoneNumber'

const initialState: IConfiguratorSchema = {
    phone: '',
    phoneError: false,
    operator: '',
    minutes: 0,
    gigabytes: 0,
    router: '',
    socialNetwork: [],
    loading: true,
    resultPrice: 0,
    data: null,
}

const configuratorSlice = createSlice({
    name: 'configurator',
    initialState,
    reducers: {
        setPhone(state, action: PayloadAction<string>) {
            const phone = filterPhoneNumber(action.payload)

            state.phone = phone
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
        setSocialNetwork(state, action) {
            state.socialNetwork = action.payload
        },
        setPhoneError(state, action) {
            state.phoneError = action.payload
        },
        setResultPrice(state, action: PayloadAction<number>) {
            state.resultPrice = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConfiguratorData.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(fetchConfiguratorData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchConfiguratorData.rejected, (state) => {
                state.loading = false
            })
    },
})

export const configuratorActions = configuratorSlice.actions
export const configuratorReducer = configuratorSlice.reducer
