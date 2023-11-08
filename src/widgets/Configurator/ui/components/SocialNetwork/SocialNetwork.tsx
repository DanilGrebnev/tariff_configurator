import { FC, useState, useRef, useLayoutEffect } from 'react'
import { Radio } from 'shared/components/Radio'
import { useAppDispatch, useAppSelector } from '@/app/providers/storeProvider'
import { ConfiguratorSelectors } from '@/entities/configurator'
import { configuratorActions } from '@/entities/configurator'
import { v4 } from 'uuid'

import Facebook from '@/shared/assets/icons/facebook_icon.svg?react'
import VK from '@/shared/assets/icons/vk_icon.svg?react'
import Inst from '@/shared/assets/icons/inst_icon.svg?react'
import TikTok from '@/shared/assets/icons/tiktok_icon.svg?react'
import Odnoklass from '@/shared/assets/icons/odnoklass_icon.svg?react'

const Icons = [Facebook, VK, Odnoklass, Inst, TikTok]

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
            {data?.socialNetwork.map((props, i) => {
                const Icon = Icons[i]
                return (
                    <Radio
                        key={v4()}
                        icon={<Icon />}
                        name={props.name}
                        value={props.price}
                    />
                )
            })}
        </form>
    )
}
