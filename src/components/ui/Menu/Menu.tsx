import { forwardRef } from 'react'
import classNames from 'classnames'
import { MenuContextProvider } from './context/menuContext'
import type { CommonProps } from '../@types/common'

export interface MenuProps extends CommonProps {
    defaultActiveKeys?: Array<string>
    defaultExpandedKeys?: Array<string>
    defaultCollapseActiveKeys?: Array<string>
    menuItemHeight?: number
    onSelect?: (eventKey: string, e: MouseEvent) => void
    sideCollapsed?: boolean
}

const Menu = forwardRef<HTMLElement, MenuProps>((props, ref) => {
    const {
        children,
        className,
        defaultActiveKeys = [],
        defaultExpandedKeys = [],
        defaultCollapseActiveKeys = [],
        menuItemHeight = 48,
        onSelect,
        sideCollapsed = false,
        ...rest
    } = props

    const menuDefaultClass = 'menu'

    const menuClass = classNames(menuDefaultClass, className)

    return (
        <nav ref={ref} className={menuClass} {...rest}>
            <MenuContextProvider
                value={{
                    onSelect,
                    menuItemHeight,
                    sideCollapsed,
                    defaultExpandedKeys,
                    defaultActiveKeys,
                    defaultCollapseActiveKeys,
                }}
            >
                {children}
            </MenuContextProvider>
        </nav>
    )
})

Menu.displayName = 'Menu'

export default Menu
