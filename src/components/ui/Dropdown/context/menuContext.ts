import { createContext } from 'react'

export type MenuContextProps = {
    getItemProps: (
        userProps?: React.HTMLProps<HTMLElement>,
    ) => Record<string, unknown>
    activeIndex: number | null
    setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
    setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean
}

const MenuContext = createContext<MenuContextProps>({
    getItemProps: () => ({}),
    activeIndex: null,
    setActiveIndex: () => {},
    setHasFocusInside: () => {},
    isOpen: false,
})

export const MenuContextProvider = MenuContext.Provider

export default MenuContext
