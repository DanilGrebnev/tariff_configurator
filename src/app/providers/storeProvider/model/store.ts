import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { configuratorReducer } from '@/entities/configurator'
import { IStateSchema } from './StateSchema'

export const store = configureStore<IStateSchema>({
    reducer: { configuratorState: configuratorReducer },
})

export type StateSchema = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector
