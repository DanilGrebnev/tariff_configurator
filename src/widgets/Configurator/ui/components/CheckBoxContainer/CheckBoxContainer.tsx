import { FC, useCallback } from 'react'
import { CheckBox } from 'shared/components/CheckBox'
import { Title } from 'shared/components/Title'
import { ConfiguratorSelectors, configuratorActions } from '@/entities/configurator'
import { useAppDispatch } from '@/app/providers/storeProvider'
import { v4 } from 'uuid'
import { useAppSelector } from '@/app/providers/storeProvider'

import s from './CheckBoxContainer.module.scss'

interface ICheckBoxContainerProps {
    className?: string
    name?: string
    signature?: string
}

export const CheckBoxContainer: FC<ICheckBoxContainerProps> = () => {
    const data = useAppSelector(ConfiguratorSelectors.getData)

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
            {data?.router?.map((props) => {
                return (
                    <CheckBox
                        key={v4()}
                        onChange={changeRouter}
                        type="radio"
                        className={s.radio}
                        {...props}
                    />
                )
            })}
        </div>
    )
}
