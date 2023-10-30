import { FC, ChangeEvent } from 'react'
import { CheckBox } from 'shared/components/CheckBox'
import { Title } from 'shared/components/Title'

import s from './CheckBoxContainer.module.scss'

interface ICheckBoxContainerProps {
    className?: string
    onChange: (value: string) => void
}

export const CheckBoxContainer: FC<ICheckBoxContainerProps> = (props) => {
    const { onChange } = props

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className={s.CheckBoxContainer}>
            <Title style={{ marginBottom: '40px' }}>Wi-Fi роутер</Title>
            <CheckBox
                value="rent"
                name="wi-fi"
                signature="Аренда 99 ₽/мес."
                type="radio"
                onChange={changeValue}
                className={s.radio1}
            />
            <CheckBox
                defaultChecked
                onChange={changeValue}
                value="purchase"
                name="wi-fi"
                type="radio"
                signature="Выкупить 2600 ₽/мес."
            />
        </div>
    )
}
