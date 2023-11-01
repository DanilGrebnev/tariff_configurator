import { FC, useState, useRef, useLayoutEffect } from 'react'
import { Radio } from 'shared/components/Radio'

import VkIcon from 'shared/assets/icons/vk_icon.svg?react'
import OdnoclassIcon from 'shared/assets/icons/odnoklass_icon.svg?react'
import FacebookIcon from 'shared/assets/icons/facebook_icon.svg?react'
import InstagramIcon from 'shared/assets/icons/inst_icon.svg?react'
import TikTokIcon from 'shared/assets/icons/tiktok_icon.svg?react'

import s from './SocialNetwork.module.scss'

interface ISocialNetworkProps {
    className?: string
}

export const SocialNetwork: FC<ISocialNetworkProps> = () => {
    const [inputsCollection, setInputs] = useState<HTMLFormControlsCollection | []>([])

    const formRef = useRef<HTMLFormElement>(null)

    useLayoutEffect(() => {
        setInputs(formRef.current?.elements || [])
    }, [])

    const onChange = () => {
        console.log(inputsCollection)
    }

    return (
        <form
            ref={formRef}
            onChange={onChange}
            className={s.SocialNetwork}
        >
            <Radio icon={<FacebookIcon />} />
            <Radio icon={<VkIcon />} />
            <Radio icon={<OdnoclassIcon />} />
            <Radio icon={<InstagramIcon />} />
            <Radio icon={<TikTokIcon />} />
        </form>
    )
}
