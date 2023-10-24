import { FC } from 'react'
import s from './Configurator.module.scss'
import { Input } from 'shared/components/Input'
import { Select } from '@/shared/components/Select'

interface IConfiguratorProps {
    className?: string
}

const a = ['Оператор 1', 'Оператор 2', 'Оператор 3']

export const Configurator: FC<IConfiguratorProps> = () => {
    return (
        <section
            id="configurator"
            className={s.Configurator}
        >
            <h1>Настройте тариф</h1>
            <Input
                inputTitle="Телефон"
                placeholder="+7 (____) ___-__-__"
                signature="Обязательное поле"
            />
            <Select
                dataList={a}
                onChange={(data) => {
                    // console.log(data)
                }}
            />
        </section>
    )
}
