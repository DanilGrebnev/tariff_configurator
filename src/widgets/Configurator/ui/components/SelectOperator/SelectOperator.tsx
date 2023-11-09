import { useCallback, memo } from 'react'
import { Select } from '@/shared/components/Select'
import { useAppDispatch, useAppSelector } from '@/app/providers/storeProvider'
import { ConfiguratorSelectors, configuratorActions } from '@/entities/configurator'

export const SelectOperator = memo(() => {
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
})
