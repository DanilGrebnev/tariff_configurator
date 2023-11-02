import { FC, ChangeEvent } from 'react'
import { IInputProps } from '../../types/input'
import InputMask from 'react-input-mask'

import cn from 'classnames'
import s from '../Input.module.scss'

interface IInputWithMaskProps extends IInputProps {
    errorClass?: string
}

export const InputWithMask: FC<IInputWithMaskProps> = (props) => {
    const { onChange, value, signature, mask, errorClass, ...otherProps } = props

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onChange) return
        onChange(e.target.value)
    }

    if (mask) {
        return (
            <InputMask
                className={cn(s.input, errorClass)}
                onChange={onChangeValue}
                value={value}
                mask={mask}
                {...otherProps}
            />
        )
    }

    return (
        <input
            className={cn(s.input, errorClass)}
            onChange={onChangeValue}
            value={value}
            {...otherProps}
        />
    )
}
