import { FC, InputHTMLAttributes } from 'react'

import s from './Input.module.scss'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
    inputTitle?: string
    signature?: string
}

export const Input: FC<IInputProps> = (props) => {
    const { inputTitle, signature, ...otherProps } = props

    return (
        <div className={s['input-wrapper']}>
            {inputTitle && <h3 className={s['input-title']}>{inputTitle}</h3>}
            <input
                className={s.input}
                {...otherProps}
            />
            {signature && <h5 className={s.signature}>{signature}</h5>}
        </div>
    )
}
