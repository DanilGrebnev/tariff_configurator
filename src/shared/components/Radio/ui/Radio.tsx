import { ChangeEvent, ReactNode, FC, InputHTMLAttributes, useState, memo } from 'react'

import cn from 'classnames'
import s from './Radio.module.scss'

interface IRadioProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    icon?: ReactNode
    srcIcon?: string
}

export const Radio: FC<IRadioProps> = memo((props) => {
    const { icon, srcIcon, ...otherProps } = props

    const [checked, setChecked] = useState(false)

    const changeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)
    }

    return (
        <label className={cn(s.Radio, { [s.active]: checked })}>
            <input
                type="checkbox"
                onChange={(e) => {
                    changeChecked(e)
                }}
                {...otherProps}
            />
            <div className={s['radio-icon']}>{icon || <img src={srcIcon} />}</div>
            <span>20 ₽</span>
        </label>
    )
})
