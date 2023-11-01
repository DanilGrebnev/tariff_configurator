import { useAppDispatch } from '@/app/providers/storeProvider'
import { configuratorActions } from '@/entities/configurator'
import { Input } from '@/shared/components/Input'
import { FC, useCallback } from 'react'

interface IPhoneInputProps {
    className?: string
}

export const PhoneInput: FC<IPhoneInputProps> = () => {
    const dispatch = useAppDispatch()

    const changeInputValue = useCallback(
        (value: string) => {
            dispatch(configuratorActions.setPhone(value))
        },
        [dispatch]
    )

    return (
        <Input
            inputTitle="Телефон"
            placeholder="+7 (___) ___-__-__"
            signature="Обязательное поле"
            onChange={changeInputValue}
        />
    )
}
