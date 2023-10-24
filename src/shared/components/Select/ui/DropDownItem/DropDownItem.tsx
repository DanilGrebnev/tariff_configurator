import { FC } from 'react'
import { IDropDownItemProps } from '../../types/select'

export const DropDownItem: FC<IDropDownItemProps> = (props) => {
    const { className, data, onClick } = props

    return (
        <div
            onClick={onClick}
            className={className}
        >
            {data}
        </div>
    )
}
