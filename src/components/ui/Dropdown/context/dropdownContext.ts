import { createContext } from 'react'

export type DropdownContextProps = {
    activeKey?: string
}

const DropdownContext = createContext<DropdownContextProps>({})

export const DropdownContextProvider = DropdownContext.Provider

export default DropdownContext
