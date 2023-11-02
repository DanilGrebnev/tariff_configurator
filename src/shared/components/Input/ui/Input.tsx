import { FC, memo } from 'react'
import { Title } from 'shared/components/Title'
import { IInputProps } from '../types/input'
import { InputWithMask } from './InputWithMask/InputWithMask'
import ErrorIcon from 'shared/assets/icons/error_input.svg?react'

import cn from 'classnames'
import s from './Input.module.scss'

export const Input: FC<IInputProps> = memo((props) => {
    const { inputTitle, signature, isError, ...otherProps } = props

    const errorClass = cn({ [s.error]: isError })

    return (
        <div className={s['input-container']}>
            {inputTitle && <Title className={s['input-title']}>{inputTitle}</Title>}
            <div className={s['input_wrapper']}>
                <InputWithMask
                    errorClass={errorClass}
                    {...otherProps}
                />
                <ErrorIcon className={s['error_icon']} />
            </div>
            {signature && <h5 className={cn(s.signature, errorClass)}>{signature}</h5>}
        </div>
    )
})
