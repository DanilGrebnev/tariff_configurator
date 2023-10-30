import { InputHTMLAttributes } from 'react'
export interface IInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    className?: string
    inputTitle?: string
    signature?: string
    isError?: boolean
    onChange?: (input: string) => void
}
