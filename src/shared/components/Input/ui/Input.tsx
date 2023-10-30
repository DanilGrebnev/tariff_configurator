import { FC, ChangeEvent } from 'react'
import ErrorIcon from 'shared/assets/icons/error_input.svg?react'
import { Title } from 'shared/components/Title'
import cn from 'classnames'
import s from './Input.module.scss'
import { IInputProps } from '../types/input'

export const Input: FC<IInputProps> = (props) => {
    const { inputTitle, onChange, value, isError, signature, ...otherProps } = props
    const errorClass = cn({ [s.error]: isError })

    const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onChange) return
        onChange(e.target.value)
    }

    return (
        <div className={s['input-container']}>
            {inputTitle && <Title className={s['input-title']}>{inputTitle}</Title>}
            <div className={s['input_wrapper']}>
                <input
                    value={value}
                    className={cn(s.input, errorClass)}
                    onChange={onChangeValue}
                    {...otherProps}
                />
                <ErrorIcon className={s['error_icon']} />
            </div>
            {signature && <h5 className={cn(s.signature, errorClass)}>{signature}</h5>}
        </div>
    )
}
