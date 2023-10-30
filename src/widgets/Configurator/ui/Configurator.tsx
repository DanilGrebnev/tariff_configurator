import { FC, useState, useCallback } from 'react'
import { Input } from 'shared/components/Input'
import { Select } from 'shared/components/Select'
import { Range } from 'shared/components/Range'
import { Title } from 'shared/components/Title'
import { CheckBoxContainer } from './components/CheckBoxContainer/CheckBoxContainer'
import { Radio } from 'shared/components/Radio'

import VkIcon from 'shared/assets/icons/vk_icon.svg?react'

import s from './Configurator.module.scss'

interface IConfiguratorProps {
    className?: string
}

const a = ['Оператор 1', 'Оператор 2', 'Оператор 3']
const rangeValuesGigs = [200, 250, 600, 650]
const rangeValuesMinutes = [5, 15, 30, 35]

export const Configurator: FC<IConfiguratorProps> = () => {
    const [router, setRouter] = useState<string>('purchase')
    const [minutes, setMinutes] = useState<number>(0)
    const [gigabyte, setGigabyte] = useState<number>(0)
    const [inputValue, setInputValue] = useState<string>('')
    const [operator, setOperator] = useState<string>('')

    const changeRouter = useCallback((value: string) => {
        setRouter(value)
    }, [])

    const changeMinutes = useCallback((value: number) => {
        setMinutes(value)
    }, [])

    const changeGigabyte = useCallback((value: number) => {
        setGigabyte(value)
    }, [])

    const changeInputValue = useCallback((value: string) => {
        setInputValue(value)
    }, [])

    const changeOperatorValue = useCallback((value: string) => {
        setOperator(value)
    }, [])

    return (
        <section
            id="configurator"
            className={s.Configurator}
        >
            <Title size="L">Настройте тариф</Title>
            <Input
                value={inputValue}
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
            <CheckBoxContainer onChange={changeRouter} />
            <Radio icon={<VkIcon />} />
        </section>
    )
}
