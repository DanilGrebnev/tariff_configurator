import { FC, useCallback } from 'react'
import { Range } from '@/shared/components/Range'
import { useAppDispatch, useAppSelector } from '@/app/providers/storeProvider'
import { ConfiguratorSelectors, configuratorActions } from '@/entities/configurator'

export const RangeMinutes: FC = () => {
    const data = useAppSelector(ConfiguratorSelectors.getData)

    const values = data?.minutes.map((item) => item.value) || []

    const dispatch = useAppDispatch()

    const changeMinutes = useCallback(
        (value: number) => {
            dispatch(configuratorActions.setMinutes(value))
        },
        [dispatch]
    )

    return (
        <Range
            rangeTitle="Минуты"
            onChange={changeMinutes}
            values={values}
        />
    )
}
