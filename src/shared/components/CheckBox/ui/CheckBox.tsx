import { FC, InputHTMLAttributes, ReactNode, memo } from 'react'
import CheckedIcon from 'shared/assets/icons/check_icon.svg?react'
import cn from 'classnames'

import s from './CheckBox.module.scss'

interface ICheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    signature?: ReactNode
}

export const CheckBox: FC<ICheckBoxProps> = memo((props) => {
    const { signature, className, ...otherProps } = props

    return (
        <label className={cn(s['checkbox-wrapper'], className)}>
            <input
                id="checkbox"
                type="checkbox"
                className={s['checkbox-input']}
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
