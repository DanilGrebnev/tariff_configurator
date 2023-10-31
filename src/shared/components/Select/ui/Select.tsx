import { FC, useState, useEffect, KeyboardEvent, memo } from 'react'
import { v4 } from 'uuid'
import { DropDownItem } from './DropDownItem/DropDownItem'
import { ISelectProps } from '../types/select'
import { Title } from '../../Title'

import ArrowIcon from 'shared/assets/icons/arrow.svg?react'

import cn from 'classnames'
import s from './style/Select.module.scss'

import './style/variables.scss'

export const Select: FC<ISelectProps> = memo((props) => {
    const { selectTitle, signature, dataList, onChange } = props

    const [isOpen, setIsOpen] = useState(false)
    const [currentData, setCurrentData] = useState<string>(dataList[0])

    const isOpenClass = cn({ [s.open]: isOpen })

    const toggleDropDown = () => {
        setIsOpen((p) => (p = !p))
    }

    //Функция закрытия/открытия по нажатию на enter
    const onKeyPressDropDownOpen = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            toggleDropDown()
        }
    }

    //Функция выбора значения
    const selectValue = (data: string) => {
        setCurrentData(data)
        onChange(data)
        toggleDropDown()
    }

    useEffect(() => {
        onChange(currentData)
    }, [currentData, onChange])

    return (
        <div className={s['select-wrapper']}>
            {selectTitle && <Title className={s['select-title']}>{selectTitle}</Title>}
            <div
                tabIndex={0}
                onClick={toggleDropDown}
                onKeyDown={onKeyPressDropDownOpen}
                className={cn(s.select, isOpenClass)}
            >
                <span>{currentData}</span>
                <ArrowIcon className={cn(s.arrow, isOpenClass)} />
            </div>
            <div className={cn(s['select-dropdown'], isOpenClass)}>
                {dataList.map((data) => {
                    return (
                        <DropDownItem
                            key={v4()}
                            data={data}
                            onClick={() => selectValue(data)}
                            isActive={data === currentData}
                        />
                    )
                })}
            </div>

            {signature && <h5 className={s.signature}>{signature}</h5>}
        </div>
    )
})

Select.displayName = 'Select'
