import { FC, HTMLAttributes, memo } from 'react'
import cn from 'classnames'
import s from './Title.module.scss'

export enum TitleSize {
    L = 'L',
    M = 'M',
}

interface ITitleProps extends HTMLAttributes<HTMLHeadingElement> {
    className?: string
    children?: string
    size?: keyof typeof TitleSize
}

export const Title: FC<ITitleProps> = memo((props) => {
    const { children, className, size = TitleSize.M, ...otherProps } = props

    return (
        <h3
            {...otherProps}
            className={cn(s.Title, s[size], className)}
        >
            {children}
        </h3>
    )
})
