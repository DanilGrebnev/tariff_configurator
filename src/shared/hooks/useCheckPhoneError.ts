import { useEffect, Dispatch, SetStateAction } from 'react'
import { ConfiguratorSelectors, configuratorActions } from '@/entities/configurator'
import { useAppDispatch, useAppSelector } from '@/app/providers/storeProvider'

interface IUseCheckPhoneError {
    setError?: Dispatch<SetStateAction<boolean>>
}

export const useCheckPhoneError = (props: IUseCheckPhoneError) => {
    const { setError } = props
    const dispatch = useAppDispatch()
    const phoneNumber = useAppSelector(ConfiguratorSelectors.getPhoneData)

    const chageError = (isError: boolean) => {
        if (!setError) return
        setError(isError)
    }

    const checkPhoneInputValue = () => {
        if (+phoneNumber.length < 12) {
            dispatch(configuratorActions.setPhoneError(true))
            chageError(true)
        } else {
            dispatch(configuratorActions.setPhoneError(false))
            chageError(false)
        }
    }

    useEffect(() => {
        checkPhoneInputValue()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phoneNumber])
}
