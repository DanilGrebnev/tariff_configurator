import { FC, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '../model/store'

interface IStoreProvider {
    children?: ReactNode
}

export const StoreProvider: FC<IStoreProvider> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
}
