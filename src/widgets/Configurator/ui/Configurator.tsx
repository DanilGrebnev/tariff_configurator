import { FC, useState } from 'react'
import s from './Configurator.module.scss'
import { Input } from 'shared/components/Input'
import { Select } from '@/shared/components/Select'

interface IConfiguratorProps {
    className?: string
}

const a = ['Оператор 1', 'Оператор 2', 'Оператор 3']

export const Configurator: FC<IConfiguratorProps> = () => {
    const [error, setError] = useState(false)

    return (
        <section
            id="configurator"
            className={s.Configurator}
        >
            <button onClick={() => setError((p) => (p = !p))}>toggle</button>
            <h1>Настройте тариф</h1>
            <Input
                isError={error}
                inputTitle="Телефон"
                placeholder="+7 (___) ___-__-__"
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
