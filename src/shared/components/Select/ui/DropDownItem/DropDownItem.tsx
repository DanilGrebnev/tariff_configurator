import { FC } from 'react'
import { IDropDownItemProps } from '../../types/select'

export const DropDownItem: FC<IDropDownItemProps> = (props) => {
    const { className, data, onClick, ...otherProps } = props

    return (
        <button
            {...otherProps}
            onClick={onClick}
            className={className}
        >
            {data}
        </button>
    )
}
