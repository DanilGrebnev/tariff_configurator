import { useState, useRef, useLayoutEffect, memo, useEffect } from 'react'
import { Radio } from 'shared/components/Radio'
import { useAppDispatch, useAppSelector } from '@/app/providers/storeProvider'
import { ConfiguratorSelectors } from '@/entities/configurator'
import { configuratorActions } from '@/entities/configurator'
import { v4 } from 'uuid'

import s from './SocialNetwork.module.scss'

export const SocialNetwork = memo(() => {
    const formRef = useRef<HTMLFormElement>(null)

    const socialNetwork = useAppSelector(ConfiguratorSelectors.getSocialNetworkFromData)
    const dispatch = useAppDispatch()
    const [inputsCollection, setInputs] = useState<HTMLFormControlsCollection | []>([])

    useLayoutEffect(() => {
        setInputs(formRef.current?.elements || [])
    }, [])

    const onChange = () => {
        const inputs = [...inputsCollection] as HTMLInputElement[]

        const result: { price: number; name: string }[] = []

        inputs.forEach((input) => {
            if (input.checked) {
                const item = { price: +input.value, name: input.name }
                result.push(item)
            }
        })

        dispatch(configuratorActions.setSocialNetwork(result))
    }

    useEffect(() => {
        const result: { price: number; name: string }[] = []

        socialNetwork?.forEach((item) => {
            if (!item.checked) return
            result.push({ price: +item.price, name: item.name })
        })

        dispatch(configuratorActions.setSocialNetwork(result))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socialNetwork])

    return (
        <form
            ref={formRef}
            onChange={onChange}
            className={s.SocialNetwork}
        >
            {socialNetwork?.map((props) => {
                const { iconNotChecked, checked, icon, name, price } = props

                return (
                    <Radio
                        key={v4()}
                        iconNotChecked={iconNotChecked}
                        srcIcon={icon}
                        checked={checked || false}
                        name={name}
                        value={price}
                    />
                )
            })}
        </form>
    )
})
