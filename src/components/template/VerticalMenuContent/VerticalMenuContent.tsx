import { useState, useEffect, Fragment } from 'react'
import Menu from '@/components/ui/Menu'
import VerticalSingleMenuItem from './VerticalSingleMenuItem'
import VerticalCollapsedMenuItem from './VerticalCollapsedMenuItem'
import { themeConfig } from '@/configs/theme.config'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import useMenuActive from '@/utils/hooks/useMenuActive'
import useTranslation from '@/utils/hooks/useTranslation'
import { Direction } from '@/@types/theme'
import type { NavigationTree } from '@/@types/navigation'
import type { TraslationFn } from '@/@types/common'

export interface VerticalMenuContentProps {
    collapsed?: boolean
    routeKey: string
    navigationTree?: NavigationTree[]
    onMenuItemClick?: () => void
    direction?: Direction
    translationSetup?: boolean
    userAuthority: string[]
}

const { MenuGroup } = Menu

const VerticalMenuContent = (props: VerticalMenuContentProps) => {
    const {
        collapsed,
        routeKey,
        navigationTree = [],
        onMenuItemClick,
        direction = themeConfig.direction,
        translationSetup,
        userAuthority,
    } = props

    const { t } = useTranslation(!translationSetup)

    const [defaulExpandKey, setDefaulExpandKey] = useState<string[]>([])

    const { activedRoute } = useMenuActive(navigationTree, routeKey)

    useEffect(() => {
        if (defaulExpandKey.length === 0 && activedRoute?.parentKey) {
            setDefaulExpandKey([activedRoute?.parentKey])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activedRoute?.parentKey])

    const handleLinkClick = () => {
        onMenuItemClick?.()
    }

    const renderNavigation = (
        navTree: NavigationTree[],
        cascade: number = 0,
        indent?: boolean,
    ) => {
        const nextCascade = cascade + 1

        return (
            <>
                {navTree.map((nav) => (
                    <Fragment key={nav.key}>
                        {nav.type === NAV_ITEM_TYPE_ITEM && (
                            <VerticalSingleMenuItem
                                key={nav.key}
                                nav={nav}
                                sideCollapsed={collapsed}
                                direction={direction}
                                indent={indent}
                                renderAsIcon={cascade <= 0}
                                showIcon={cascade <= 0}
                                userAuthority={userAuthority}
                                showTitle={
                                    collapsed ? cascade >= 1 : cascade <= 1
                                }
                                t={t as TraslationFn}
                                onLinkClick={handleLinkClick}
                            />
                        )}
                        {nav.type === NAV_ITEM_TYPE_COLLAPSE && (
                            <VerticalCollapsedMenuItem
                                key={nav.key}
                                nav={nav}
                                sideCollapsed={collapsed}
                                direction={direction}
                                indent={nextCascade >= 2}
                                dotIndent={nextCascade >= 2}
                                renderAsIcon={nextCascade <= 1}
                                userAuthority={userAuthority}
                                t={t as TraslationFn}
                                onLinkClick={onMenuItemClick}
                            >
                                {nav.subMenu &&
                                    nav.subMenu.length > 0 &&
                                    renderNavigation(
                                        nav.subMenu,
                                        nextCascade,
                                        true,
                                    )}
                            </VerticalCollapsedMenuItem>
                        )}
                        {nav.type === NAV_ITEM_TYPE_TITLE && (
                            <MenuGroup
                                key={nav.key}
                                label={t(nav.translateKey) || nav.title}
                            >
                                {nav.subMenu &&
                                    nav.subMenu.length > 0 &&
                                    renderNavigation(
                                        nav.subMenu,
                                        cascade,
                                        false,
                                    )}
                            </MenuGroup>
                        )}
                    </Fragment>
                ))}
            </>
        )
    }

    return (
        <Menu
            className="px-4 pb-4"
            sideCollapsed={collapsed}
            defaultActiveKeys={activedRoute?.key ? [activedRoute.key] : []}
            defaultExpandedKeys={defaulExpandKey}
            defaultCollapseActiveKeys={
                activedRoute?.parentKey ? [activedRoute.parentKey] : []
            }
        >
            {renderNavigation(navigationTree, 0)}
        </Menu>
    )
}

export default VerticalMenuContent
