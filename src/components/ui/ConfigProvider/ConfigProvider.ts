import { createContext, useContext } from 'react'
import { SIZES } from '../utils/constants'
import type { TypeAttributes } from '../@types/common'

export type Config = {
    mode: 'light' | 'dark'
    locale: string
    controlSize: TypeAttributes.ControlSize
    direction: TypeAttributes.Direction
    ui?: {
        card?: {
            cardBordered?: boolean
        }
        button?: {
            disableClickFeedback?: boolean
        }
    }
}

export const defaultConfig: Config = {
    direction: 'ltr',
    mode: 'light',
    locale: 'en',
    controlSize: SIZES.MD,
} as const

export const ConfigContext = createContext<Config>(defaultConfig)

const ConfigProvider = ConfigContext.Provider

export const ConfigConsumer = ConfigContext.Consumer

export function useConfig() {
    return useContext(ConfigContext)
}

export default ConfigProvider
