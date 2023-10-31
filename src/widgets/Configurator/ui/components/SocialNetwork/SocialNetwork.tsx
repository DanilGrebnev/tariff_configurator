import { FC } from 'react'
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
    return (
        <div className={s.SocialNetwork}>
            <Radio
                onChange={(value) => console.log(value)}
                icon={<FacebookIcon />}
            />
            <Radio
                onChange={(value) => console.log(value)}
                icon={<VkIcon />}
            />
            <Radio
                onChange={(value) => console.log(value)}
                icon={<OdnoclassIcon />}
            />
            <Radio
                onChange={(value) => console.log(value)}
                icon={<InstagramIcon />}
            />
            <Radio
                onChange={(value) => console.log(value)}
                icon={<TikTokIcon />}
            />
        </div>
    )
}
