import { ButtonHTMLAttributes } from 'react'

export interface ISelectProps {
    className?: string
    selectTitle?: string
    signature?: string
    dataList: string[]
    onChange: (data: string) => void
}

export interface IDropDownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    data: string
    isActive?: boolean
    onClick?: () => void
}
