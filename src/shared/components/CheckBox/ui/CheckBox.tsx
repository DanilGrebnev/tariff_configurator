import { FC, ChangeEvent, InputHTMLAttributes, ReactNode, useEffect, useRef, memo } from 'react'
import CheckedIcon from 'shared/assets/icons/check_icon.svg?react'
import cn from 'classnames'

import s from './CheckBox.module.scss'

interface ICheckBoxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    className?: string
    signature?: ReactNode
    onChange: (value: string) => void
}

export const CheckBox: FC<ICheckBoxProps> = memo((props) => {
    const { signature, className, onChange, defaultChecked, ...otherProps } = props

    const ref = useRef<HTMLInputElement>(null)

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    useEffect(() => {
        if (!ref.current) return
        if (!defaultChecked) return
        onChange(ref.current?.value)
    }, [defaultChecked, onChange])

    return (
        <label className={cn(s['checkbox-wrapper'], className)}>
            <input
                ref={ref}
                id="checkbox"
                type="checkbox"
                className={s['checkbox-input']}
                onChange={onChangeValue}
                defaultChecked={defaultChecked}
                {...otherProps}
            />
            <div className={s['checkbox-check']}></div>
            <div className={s['checkbox-checked']}>
                <CheckedIcon />
            </div>
            <div>{signature}</div>
        </label>
    )
})

CheckBox.displayName = 'CheckBox'
