import { FC, useCallback } from 'react'
import { CheckBox } from 'shared/components/CheckBox'
import { Title } from 'shared/components/Title'

import s from './CheckBoxContainer.module.scss'
import { configuratorActions } from '@/entities/configurator'
import { useAppDispatch } from '@/app/providers/storeProvider'

type TCheckBoxItem = {
    name: string
    value: string
    signature: string
    defaultChecked?: boolean
}

interface ICheckBoxContainerProps {
    className?: string
    name?: string
    signature?: string
    data?: TCheckBoxItem[]
}

export const CheckBoxContainer: FC<ICheckBoxContainerProps> = (props) => {
    const { data } = props

    const dispatch = useAppDispatch()

    const changeRouter = useCallback(
        (value: string) => {
            dispatch(configuratorActions.setRouter(value))
        },
        [dispatch]
    )

    return (
        <div className={s.CheckBoxContainer}>
            <Title style={{ marginBottom: '40px' }}>Wi-Fi роутер</Title>
            {data?.map((props) => {
                return (
                    <CheckBox
                        {...props}
                        onChange={changeRouter}
                        type="radio"
                        className={s.radio}
                    />
                )
            })}
        </div>
    )
}
