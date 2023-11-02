import { useCallback, useState, memo } from 'react'
import { useAppDispatch } from '@/app/providers/storeProvider'
import { ConfiguratorSelectors, configuratorActions } from '@/entities/configurator'
import { useAppSelector } from '@/app/providers/storeProvider'
import { Input } from '@/shared/components/Input'
import InputMask from 'react-input-mask'

export const PhoneInput = memo(() => {
    const [error, setIsError] = useState<boolean>(false)
    const phoneValue = useAppSelector(ConfiguratorSelectors.getPhoneData)
    const dispatch = useAppDispatch()

    const changeInputValue = useCallback(
        (value: string) => {
            dispatch(configuratorActions.setPhone(value))
        },
        [dispatch]
    )

    return (
        <>
            <InputMask
                mask={'+7(000)-000-00-00'}
                value={'+79376975901'}
            />
            <Input
                value={phoneValue}
                type="number"
                isError={error}
                inputTitle="Телефон"
                placeholder="+7 (___) ___-__-__"
                signature="Обязательное поле"
                onChange={changeInputValue}
            />
        </>
    )
})

PhoneInput.displayName = 'PhoneInput'
