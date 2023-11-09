import { useEffect, FC, InputHTMLAttributes, useState, memo } from 'react'

import cn from 'classnames'
import s from './Radio.module.scss'

interface IRadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    className?: string
    srcIcon?: string
    iconNotChecked: string
    value: number
    onChange?: (checked: boolean) => void
}

export const Radio: FC<IRadioProps> = memo((props) => {
    const { value, srcIcon, iconNotChecked, checked, onChange, ...otherProps } = props
    const [isChecked, setIsChecked] = useState(checked || false)

    const isCheckedClass = cn({ [s.checked]: isChecked })

    const toggleChecked = () => {
        setIsChecked(!isChecked)
    }

    useEffect(() => {
        if (!onChange) return
        onChange(isChecked)
        // onChange(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isChecked])

    return (
        <label className={cn(s.Radio, isCheckedClass)}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={toggleChecked}
                value={value}
                {...otherProps}
            />
            <div className={cn(s['radio-icon'], isCheckedClass)}>
                <img src={isChecked ? srcIcon : iconNotChecked} />
            </div>
            <p>{value} ₽</p>
        </label>
    )
})
