import { InputHTMLAttributes } from 'react'

export interface ISelectProps {
    className?: string
    selectTitle?: string
    signature?: string
    dataList: string[]
    onChange: (data: string) => void
}

export interface IDropDownItemProps extends InputHTMLAttributes<HTMLDivElement> {
    className?: string
    data: string
    onClick?: () => void
}
