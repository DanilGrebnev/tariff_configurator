import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { configuratorReducer } from '@/entities/configurator'

export const store = configureStore({
    reducer: { configuratorReducer },
})

export type StateSchema = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector
