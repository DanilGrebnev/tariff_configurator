import { useCallback, memo } from 'react'
import { useAppDispatch } from '@/app/providers/storeProvider'
import { ConfiguratorSelectors, configuratorActions } from '@/entities/configurator'
import { useAppSelector } from '@/app/providers/storeProvider'
import { Input } from '@/shared/components/Input'

export const PhoneInput = memo(() => {
    const dispatch = useAppDispatch()
    const phoneValue = useAppSelector(ConfiguratorSelectors.getPhoneData)
    const phoneError = useAppSelector(ConfiguratorSelectors.getPhoneError)

    const changeInputValue = useCallback(
        (value: string) => {
            dispatch(configuratorActions.setPhone(value))
        },
        [dispatch]
    )

    return (
        <>
            <Input
                value={phoneValue}
                isError={phoneError}
                inputTitle="Телефон"
                placeholder="+7 (___) ___-__-__"
                signature="Обязательное поле"
                mask="+7 \(999\)\-999\-99\-99"
                onChange={changeInputValue}
            />
        </>
    )
})

PhoneInput.displayName = 'PhoneInput'
