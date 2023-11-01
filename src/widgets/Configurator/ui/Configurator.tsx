import { FC, useCallback, useEffect } from 'react'
import { Title } from 'shared/components/Title'
import { CheckBoxContainer } from './components/CheckBoxContainer/CheckBoxContainer'
import { SocialNetwork } from './components/SocialNetwork/SocialNetwork'
import { useAppDispatch } from '@/app/providers/storeProvider'
import { fetchConfiguratorData } from '@/entities/configurator'
import { RangeMinutes } from './components/RangeMinutes/RangeMinutes'
import { Button } from './components/Button/Button'
import { RangeGigabytes } from './components/RangeGigabytes/RangeGigabytes'
import { SelectOperator } from './components/SelectOperator/SelectOperator'
import { PhoneInput } from './components/PhoneInput/PhoneInput'

import s from './Configurator.module.scss'

interface IConfiguratorProps {
    className?: string
}

export const Configurator: FC<IConfiguratorProps> = () => {
    const dispatch = useAppDispatch()

    const fetchData = () => {
        dispatch(fetchConfiguratorData())
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section
            id="configurator"
            className={s.Configurator}
        >
            <Title size="L">Настройте тариф</Title>
            <PhoneInput />
            <SelectOperator />
            <RangeMinutes />
            <RangeGigabytes />
            <CheckBoxContainer />
            <SocialNetwork />
            <Button />
        </section>
    )
}
