import { FC } from 'react'
import cn from 'classnames'
import s from './Title.module.scss'

export enum TitleSize {
    L = 'L',
    M = 'M',
}

interface ITitleProps {
    className?: string
    children?: string
    size?: keyof typeof TitleSize
}

export const Title: FC<ITitleProps> = (props) => {
    const { children, className, size = TitleSize.M } = props

    return <h3 className={cn(s.Title, s[size], className)}>{children}</h3>
}
