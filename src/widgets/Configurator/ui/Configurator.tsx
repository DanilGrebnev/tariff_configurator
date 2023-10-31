import { FC, useCallback } from 'react'
import { Input } from 'shared/components/Input'
import { Select } from 'shared/components/Select'
import { Range } from 'shared/components/Range'
import { Title } from 'shared/components/Title'
import { CheckBoxContainer } from './components/CheckBoxContainer/CheckBoxContainer'
import { SocialNetwork } from './components/SocialNetwork/SocialNetwork'
import { configuratorActions } from '@/entities/configurator'
import { useAppDispatch } from '@/app/providers/storeProvider'

import s from './Configurator.module.scss'

interface IConfiguratorProps {
    className?: string
}

const a = ['Оператор 1', 'Оператор 2', 'Оператор 3']
const rangeValuesGigs = [200, 250, 600, 650]
const rangeValuesMinutes = [5, 15, 30, 35]
const checkBoxesValues = [
    {
        name: 'wi-fi',
        value: 'rent',
        signature: 'Аренда 99 ₽/мес.',
        defaultChecked: false,
    },
    {
        name: 'wi-fi',
        value: 'purchase',
        signature: 'Выкупить 2600 ₽/мес.',
        defaultChecked: true,
    },
]

export const Configurator: FC<IConfiguratorProps> = () => {
    const dispatch = useAppDispatch()

    const changeMinutes = useCallback(
        (value: number) => {
            dispatch(configuratorActions.setMinutes(value))
        },
        [dispatch]
    )

    const changeGigabyte = useCallback(
        (value: number) => {
            dispatch(configuratorActions.setGigabytes(value))
        },
        [dispatch]
    )

    const changeInputValue = useCallback(
        (value: string) => {
            dispatch(configuratorActions.setPhone(value))
        },
        [dispatch]
    )

    const changeOperatorValue = useCallback(
        (value: string) => {
            dispatch(configuratorActions.setOperator(value))
        },
        [dispatch]
    )

    return (
        <section
            id="configurator"
            className={s.Configurator}
        >
            <Title size="L">Настройте тариф</Title>
            <Input
                inputTitle="Телефон"
                placeholder="+7 (___) ___-__-__"
                signature="Обязательное поле"
                onChange={changeInputValue}
            />
            <Select
                dataList={a}
                selectTitle="Оператор"
                onChange={changeOperatorValue}
            />
            <Range
                rangeTitle="Минуты"
                onChange={changeMinutes}
                values={rangeValuesGigs}
            />
            <Range
                rangeTitle="Интернет"
                thumbColor="black"
                fillTrackColor="black"
                onChange={changeGigabyte}
                values={rangeValuesMinutes}
            />
            <CheckBoxContainer data={checkBoxesValues} />
            <SocialNetwork />
        </section>
    )
}
