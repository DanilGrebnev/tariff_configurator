export type TRangeData = { value: number; price: number }[]

type TCheckboxData = {
    name: string
    value: 'purchase' | 'rent'
    signature: string
    defaultChecked?: boolean
    price: number
}

type TSocialNetwork = {
    name: string
    price: number
    icon: string
    iconNotChecked: string
    checked?: boolean
}

interface IData {
    operators: string[]
    minutes: TRangeData
    gigabytes: TRangeData
    router: TCheckboxData[]
    socialNetwork: TSocialNetwork[]
}

export interface IConfiguratorSchema {
    phone: string
    phoneError: boolean
    operator: string
    minutes: number
    gigabytes: number
    router: string
    socialNetwork: Omit<TSocialNetwork, 'icon'>[] | []
    loading: boolean
    resultPrice: number
    data: IData | null
}
