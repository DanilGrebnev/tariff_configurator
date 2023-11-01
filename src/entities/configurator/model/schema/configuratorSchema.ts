type TRangeData = { value: number; price: number }[]
type TCheckboxData = { name: string; value: string; signature: string; defaultChecked?: boolean }

interface IData {
    operators: string[]
    minutes: TRangeData
    gigabytes: TRangeData
    router: TCheckboxData[]
}

export interface IConfiguratorSchema {
    phone: string
    operator: string
    minutes: number
    gigabytes: number
    socialMedia: string
    router: string
    data: IData | null
}
