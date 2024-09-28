import { forwardRef } from 'react'
import classNames from 'classnames'
import type { CommonProps } from '../@types/common'
import type { ElementType } from 'react'
import { PiDotOutlineFill } from 'react-icons/pi'

export interface MenuItemProps extends CommonProps {
    asElement?: ElementType
    id?: string
    disabled?: boolean
    dotIndent?: boolean
    eventKey?: string
    isActive?: boolean
    menuItemHeight?: string | number
    onSelect?: (eventKey: string, e: MouseEvent) => void
}

const MenuItem = forwardRef<HTMLElement, MenuItemProps>((props, ref) => {
    const {
        asElement: Component = 'div',
        children,
        className,
        disabled,
        dotIndent,
        eventKey,
        isActive,
        menuItemHeight = 42,
        onSelect,
        style,
        ...rest
    } = props

    const menuItemActiveClass = `menu-item-active`
    const menuItemHoverClass = `menu-item-hoverable`
    const disabledClass = 'menu-item-disabled'
    const menuItemClass = classNames(
        'menu-item',
        isActive && menuItemActiveClass,
        disabled && disabledClass,
        !disabled && menuItemHoverClass,
        dotIndent && 'items-center gap-2',
        className,
    )

    const hanldeOnClick = (e: MouseEvent) => {
        if (onSelect) {
            onSelect(eventKey as string, e)
        }
    }

    return (
        <Component
            ref={ref}
            className={menuItemClass}
            style={{ height: `${menuItemHeight}px`, ...style }}
            onClick={hanldeOnClick}
            {...rest}
        >
            {dotIndent ? (
                <>
                    <div>
                        <PiDotOutlineFill
                            className={classNames(
                                'text-3xl w-[24px]',
                                !isActive && 'opacity-25',
                            )}
                        />
                    </div>
                    {children}
                </>
            ) : (
                <>{children}</>
            )}
        </Component>
    )
})

MenuItem.displayName = 'BaseMenuItem'

export default MenuItem
