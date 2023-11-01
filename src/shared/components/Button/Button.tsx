import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import cn from 'classnames'

import s from './Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    children?: ReactNode
}

export const Button: FC<IButtonProps> = (props) => {
    const { className, children, ...otherProps } = props

    return (
        <button
            {...otherProps}
            className={cn(s.Button, className)}
        >
            {children}
        </button>
    )
}
