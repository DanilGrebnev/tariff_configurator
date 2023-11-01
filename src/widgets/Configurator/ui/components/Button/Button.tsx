import { FC, ButtonHTMLAttributes, useEffect, useState, useMemo, useCallback } from 'react'
import { Button as ButtonCmp } from '@/shared/components/Button/Button'
import { useAppSelector } from '@/app/providers/storeProvider'
import { ConfiguratorSelectors } from '@/entities/configurator'

import cn from 'classnames'
import s from './Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
}

type TCalculatedValue = ReturnType<typeof ConfiguratorSelectors.getCalculateValues>

export const Button: FC<IButtonProps> = (props) => {
    const { className, ...otherProps } = props
    const [state, setState] = useState<number>(0)

    const data = useAppSelector(ConfiguratorSelectors.getData)
    const calculatedValue = useAppSelector(ConfiguratorSelectors.getCalculateValues)

    /* Расчёт стоимости range */
    const calculateRangeValue = useCallback(
        (value: number, key: 'minutes' | 'gigabytes') => {
            if (!data) return
            const result = data[key].reduce((total, item) => {
                if (item.value === value) {
                    total = item.price
                }

                return total
            }, 0)

            return result
        },
        [data]
    )

    /* Расчёт стоимости в зависимости от типа оплаты за роутер */
    const calculateRouterValue = useCallback(
        (routerValue: string) => {
            let total = 0
            const routerArray = data?.router

            if (routerValue !== 'rent') return 0

            routerArray?.forEach((routerItem) => {
                const { value, price } = routerItem
                if (value === 'rent') total = price
            })

            return total
        },
        [data?.router]
    )

    const { gigabytes, minutes, router } = calculatedValue

    const gygabyteTotalPrice = useMemo(
        () => calculateRangeValue(gigabytes, 'gigabytes'),
        [gigabytes, calculateRangeValue]
    ) as number

    const minuteTotalPrice = useMemo(
        () => calculateRangeValue(minutes, 'minutes'),
        [minutes, calculateRangeValue]
    ) as number

    const routerTotalPrice = useMemo(
        () => calculateRouterValue(router),
        [router, calculateRouterValue]
    ) as number

    const socialNetworkTotalPrice = useMemo(() => {
        return calculatedValue?.socialNetwork.reduce((acc, curr) => (acc += +curr.price), 0)
    }, [calculatedValue?.socialNetwork]) as number

    const calculateFinalPrice = () => {
        const totalPrice =
            gygabyteTotalPrice + minuteTotalPrice + routerTotalPrice + socialNetworkTotalPrice
        setState(totalPrice)
    }

    useEffect(() => {
        calculateFinalPrice()
    }, [calculatedValue])

    return (
        <ButtonCmp
            {...otherProps}
            className={cn(s.Button, className)}
        >
            <span>{state} ₽</span> в месяц
        </ButtonCmp>
    )
}
