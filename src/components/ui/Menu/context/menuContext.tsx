import { createContext } from 'react'

export interface MenuContextProps {
    defaultActiveKeys?: Array<string>
    defaultExpandedKeys?: Array<string>
    defaultCollapseActiveKeys?: Array<string>
    menuItemHeight?: number
    onSelect?: (eventKey: string, e: MouseEvent) => void
    sideCollapsed?: boolean
}

const MenuContext = createContext<MenuContextProps>({})

export const MenuContextProvider = MenuContext.Provider

export const MenuContextConsumer = MenuContext.Consumer

export default MenuContext
