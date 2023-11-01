import { FC, useState, useRef, useLayoutEffect } from 'react'
import { Radio } from 'shared/components/Radio'
import { useAppDispatch, useAppSelector } from '@/app/providers/storeProvider'
import { ConfiguratorSelectors } from '@/entities/configurator'
import { configuratorActions } from '@/entities/configurator'
import { v4 } from 'uuid'

import s from './SocialNetwork.module.scss'

export const SocialNetwork: FC = () => {
    const formRef = useRef<HTMLFormElement>(null)

    const data = useAppSelector(ConfiguratorSelectors.getData)
    const dispatch = useAppDispatch()
    const [inputsCollection, setInputs] = useState<HTMLFormControlsCollection | []>([])

    useLayoutEffect(() => {
        setInputs(formRef.current?.elements || [])
    }, [])

    const onChange = () => {
        const result: { price: number; name: string }[] = []
        const a = [...inputsCollection] as HTMLInputElement[]

        a.forEach((input) => {
            if (input.checked) {
                result.push({ price: +input.value, name: input.name })
            }
        })

        dispatch(configuratorActions.setSocialNetwork(result))
    }

    return (
        <form
            ref={formRef}
            onChange={onChange}
            className={s.SocialNetwork}
        >
            {data?.socialNetwork.map((props) => {
                return (
                    <Radio
                        key={v4()}
                        srcIcon={props.icon}
                        name={props.name}
                        value={props.price}
                    />
                )
            })}
        </form>
    )
}
