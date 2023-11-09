/* eslint-disable @typescript-eslint/no-unused-vars */
import { IStateSchema } from '@/app/providers/storeProvider/model/StateSchema'

export class ConfiguratorSelectors {
    static getData(state: IStateSchema) {
        return state.configuratorState.data
    }

    static getSocialNetworkFromData(state: IStateSchema) {
        return state.configuratorState.data?.socialNetwork
    }

    static getPhoneData(state: IStateSchema) {
        return state.configuratorState.phone
    }

    static getIsLoading(state: IStateSchema) {
        return state.configuratorState.loading
    }

    static getCalculateValues(state: IStateSchema) {
        const { data, loading, resultPrice, phoneError, ...otherValues } = state.configuratorState

        return otherValues
    }

    static getPhone(state: IStateSchema) {
        return state.configuratorState.phone
    }

    static getPhoneError(state: IStateSchema) {
        return state.configuratorState.phoneError
    }

    static getResultPrice(state: IStateSchema) {
        return state.configuratorState.resultPrice
    }
}
