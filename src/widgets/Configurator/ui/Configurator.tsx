import { FC } from 'react'
import s from './Configurator.module.scss'
import { Input } from 'shared/components/Input'
import { Select } from 'shared/components/Select'
import { Range } from 'shared/components/Range'
import { Title } from 'shared/components/Title'

interface IConfiguratorProps {
    className?: string
}

const a = ['Оператор 1', 'Оператор 2', 'Оператор 3']
const rangeValuesGigs = [200, 250, 600, 650]
const rangeValuesMinutes = [5, 15, 30, 35]

export const Configurator: FC<IConfiguratorProps> = () => {
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
            />
            <Select
                dataList={a}
                selectTitle="Оператор"
                onChange={(data) => {
                    // console.log(data)
                }}
            />
            <Range
                rangeTitle="Интернет"
                onChange={(value) => console.log(value)}
                values={rangeValuesGigs}
            />
            <Range
                rangeTitle="Гигабайты"
                thumbColor="black"
                fillTrackColor="black"
                onChange={(value) => console.log(value)}
                values={rangeValuesMinutes}
            />
        </section>
    )
}
