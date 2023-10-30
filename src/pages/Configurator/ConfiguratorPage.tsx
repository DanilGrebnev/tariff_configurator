import { FC } from 'react'
import { Configurator } from 'widgets/Configurator'

import s from './ConfiguratorPage.module.scss'

export const ConfiguratorPage: FC = () => {
    return (
        <div className={s.Configurator}>
            <Configurator />
        </div>
    )
}
