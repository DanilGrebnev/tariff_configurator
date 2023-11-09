import { useCallback, memo } from 'react'
import { Range } from '@/shared/components/Range'
import { useAppDispatch, useAppSelector } from '@/app/providers/storeProvider'
import { ConfiguratorSelectors, configuratorActions } from '@/entities/configurator'

export const RangeGigabytes = memo(() => {
    const data = useAppSelector(ConfiguratorSelectors.getData)
    const dispatch = useAppDispatch()

    const values = data?.gigabytes.map((item) => item.value) || []

    const changeGigabyte = useCallback(
        (value: number) => {
            dispatch(configuratorActions.setGigabytes(value))
        },
        [dispatch]
    )

    return (
        <Range
            rangeTitle="Интернет"
            thumbColor="black"
            fillTrackColor="black"
            onChange={changeGigabyte}
            values={values}
        />
    )
})
