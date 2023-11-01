import { ButtonHTMLAttributes, FC } from 'react'
import { Button as ButtonCmp } from '@/shared/components/Button/Button'

import cn from 'classnames'
import s from './Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
}

export const Button: FC<IButtonProps> = (props) => {
    const { className, ...otherProps } = props
    return (
        <ButtonCmp
            {...otherProps}
            className={cn(s.Button, className)}
        >
            <span>480 Р</span> в месяц
        </ButtonCmp>
    )
}
