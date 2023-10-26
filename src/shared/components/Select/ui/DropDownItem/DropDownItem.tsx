import { FC } from 'react'
import { IDropDownItemProps } from '../../types/select'
import cn from 'classnames'
import s from './DropDownItem.module.scss'

export const DropDownItem: FC<IDropDownItemProps> = (props) => {
    const { data, isActive, onClick, ...otherProps } = props

    return (
        <button
            {...otherProps}
            onClick={onClick}
            className={cn(s['dropdown__item'], { [s.active]: isActive })}
        >
            {data}
        </button>
    )
}
