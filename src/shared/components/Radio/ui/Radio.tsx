import { ReactNode, useEffect, FC, InputHTMLAttributes, useState, memo } from 'react'

import cn from 'classnames'
import s from './Radio.module.scss'

interface IRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    className?: string
    icon?: ReactNode
    srcIcon?: string
    value: number
    onChange?: (checked: boolean) => void
}

export const Radio: FC<IRadioProps> = memo((props) => {
    const { icon, value, srcIcon, checked, onChange, ...otherProps } = props
    const [isChecked, setIsChecked] = useState(checked || false)

    const toggleChecked = () => {
        setIsChecked(!isChecked)
    }

    useEffect(() => {
        if (!onChange) return
        onChange(isChecked)
        onChange(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChecked])

    return (
        <label className={cn(s.Radio, { [s.checked]: isChecked })}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={toggleChecked}
                value={value}
                {...otherProps}
            />
            <div className={cn(s['radio-icon'], { [s.checked]: isChecked })}>
                {icon || <img src={srcIcon} />}
            </div>
            <p>{value} ₽</p>
        </label>
    )
})
