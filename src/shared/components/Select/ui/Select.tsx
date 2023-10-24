import React, { FC, useState, useEffect } from 'react'
import ArrowIcon from 'shared/assets/icons/arrow.svg?react'
import { v4 } from 'uuid'
import { DropDownItem } from './DropDownItem/DropDownItem'
import cn from 'classnames'
import s from './style/Select.module.scss'
import { ISelectProps } from '../types/select'

import './style/variables.scss'

export const Select: FC<ISelectProps> = (props) => {
    const { selectTitle, signature, dataList, onChange } = props

    const [isOpen, setIsOpen] = useState(false)
    const [currentData, setCurrentData] = useState<string>(dataList[0])

    const isOpenClass = cn({ [s.open]: isOpen })

    const toggleDropDown = () => {
        setIsOpen((p) => (p = !p))
    }

    const onKeyPressDropDownOpen = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            toggleDropDown()
        }
    }

    const chooseValue = (data: string) => {
        setCurrentData(data)
        onChange(data)
        toggleDropDown()
    }

    useEffect(() => {
        onChange(currentData)
    }, [onChange, currentData])

    return (
        <div className={s['select-wrapper']}>
            {selectTitle && <h3 className={s['select-title']}>{selectTitle}</h3>}
            <div
                tabIndex={0}
                onClick={() => toggleDropDown()}
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
                            onClick={() => chooseValue(data)}
                            className={cn(s['select-dropdown__item'], {
                                [s.active]: currentData === data,
                            })}
                        />
                    )
                })}
            </div>
            {signature && <h5 className={s.signature}>{signature}</h5>}
        </div>
    )
}
