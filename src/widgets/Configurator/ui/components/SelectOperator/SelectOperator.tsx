import { FC, useCallback } from 'react'
import { Select } from '@/shared/components/Select'
import { useAppDispatch, useAppSelector } from '@/app/providers/storeProvider'
import { ConfiguratorSelectors, configuratorActions } from '@/entities/configurator'

interface ISelectOperatorProps {
    className?: string
}

export const SelectOperator: FC<ISelectOperatorProps> = () => {
    const data = useAppSelector(ConfiguratorSelectors.getData)

    const dispatch = useAppDispatch()

    const changeOperatorValue = useCallback(
        (value: string) => {
            dispatch(configuratorActions.setOperator(value))
        },
        [dispatch]
    )

    return (
        <Select
            dataList={data?.operators}
            selectTitle="Оператор"
            onChange={changeOperatorValue}
        />
    )
}
