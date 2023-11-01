import { IStateSchema } from '@/app/providers/storeProvider/model/StateSchema'

export const getConfiguratorData = (state: IStateSchema) => state.configuratorState.data

export class ConfiguratorSelectors {
    static getData(state: IStateSchema) {
        return state.configuratorState.data
    }
}
