import {
    useState,
    useRef,
    useContext,
    forwardRef,
    useEffect,
    useImperativeHandle,
} from 'react'
import DropdownToggle from './DropdownToggle'
import DropdownSubItem from './DropdownSubItem'
import MenuContext from './context/menuContext'
import classNames from '../utils/classNames'
import { useConfig } from '../ConfigProvider'
import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingList,
    FloatingNode,
    FloatingPortal,
    safePolygon,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFloatingNodeId,
    useFloatingParentNodeId,
    useFloatingTree,
    useHover,
    useInteractions,
    useListItem,
    useListNavigation,
useMergeRefs,
    useRole,
    useTypeahead,
    useTransitionStyles,
} from '@floating-ui/react'
import type { CommonProps } from '../@types/common'
import type { DropdownToggleSharedProps } from './DropdownToggle'
import type { DropdownSubItemSharedProps } from './DropdownSubItem'
import type { Placement } from '@floating-ui/react'
import type { HTMLProps, FocusEvent, MouseEvent, ReactNode } from 'react'

export interface DropdownMenuProps
    extends CommonProps,
        DropdownToggleSharedProps,
        DropdownSubItemSharedProps {
    activeKey?: string
    title?: string | ReactNode
    menuClass?: string
    trigger?: 'click' | 'hover' | 'context'
    placement?: Placement
    onOpen?: (bool: boolean) => void
}

export type DropdownMenuRef = {
    handleDropdownOpen: () => void
    handleDropdownClose: () => void
}

const DropdownMenu = forwardRef<
    HTMLElement | DropdownMenuRef,
    DropdownMenuProps & HTMLProps<HTMLElement>
>((props, forwardedRef) => {
    const {
        children,
        title,
        renderTitle,
        disabled,
        toggleClassName,
        menuClass,
        placement,
        trigger = 'click',
        onOpen,
        ...rest
    } = props

    const [isOpen, setIsOpen] = useState(false)
    const [hasFocusInside, setHasFocusInside] = useState(false)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const elementsRef = useRef<Array<HTMLElement | null>>([])
    const labelsRef = useRef<Array<string | null>>([])

    const { direction } = useConfig()

    const parent = useContext(MenuContext)

    const tree = useFloatingTree()
    const nodeId = useFloatingNodeId()
    const parentId = useFloatingParentNodeId()
    const item = useListItem()

    const isNested = parentId != null

    const handleOpen = (open: boolean) => {
        if (disabled) {
            return
        }
        setIsOpen(open)
        onOpen?.(open)
    }

    const getDefaultPlacement = () => {
        return direction === 'ltr' ? 'bottom-start' : 'bottom-end'
    }

    const getNestedDefaultPlacement = () => {
        return direction === 'ltr' ? 'right-start' : 'left-start'
    }

    const { floatingStyles, refs, context } = useFloating<HTMLElement>({
        nodeId,
        open: isOpen,
        onOpenChange: (open) => {
            handleOpen(open)
        },
        placement:
            placement ||
            (isNested ? getNestedDefaultPlacement() : getDefaultPlacement()),
        middleware: [flip(), shift()],
        whileElementsMounted: autoUpdate,
    })

    const { isMounted, styles } = useTransitionStyles(context, {
        common: ({ side }) => ({
            transformOrigin: {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left',
            }[side],
        }),
        initial: {
            transform: 'translateY(-5%)',
            opacity: 0,
        },
        duration: 200,
        open: {
            opacity: 1,
            transform: 'translateY(0%)',
        },
        close: {
            opacity: 0,
            transform: 'translateY(-5%)',
        },
    })

    const hover = useHover(context, {
        enabled: isNested || trigger === 'hover',
        delay: { open: 75 },
        handleClose: safePolygon({ blockPointerEvents: true }),
    })

    const click = useClick(context, {
        event: 'mousedown',
        toggle: !isNested,
        ignoreMouse: isNested,
    })

    const role = useRole(context, { role: 'menu' })

    const dismiss = useDismiss(context, { bubbles: true })

    const listNavigation = useListNavigation(context, {
        listRef: elementsRef,
        activeIndex,
        nested: isNested,
        onNavigate: setActiveIndex,
    })
    const typeahead = useTypeahead(context, {
        listRef: labelsRef,
        onMatch: isOpen ? setActiveIndex : undefined,
        activeIndex,
    })

    const { getReferenceProps, getFloatingProps, getItemProps } =
        useInteractions([
            hover,
            role,
            dismiss,
            listNavigation,
            typeahead,
            ...(trigger === 'click' ? [click] : []),
        ])

    useEffect(() => {
        if (!tree) return

        function handleTreeClick() {
            setIsOpen(false)
            onOpen?.(false)
        }

        function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
            if (event.nodeId !== nodeId && event.parentId === parentId) {
                setIsOpen(false)
                onOpen?.(false)
            }
        }

        tree.events.on('click', handleTreeClick)
        tree.events.on('menuopen', onSubMenuOpen)

        return () => {
            tree.events.off('click', handleTreeClick)
            tree.events.off('menuopen', onSubMenuOpen)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tree, nodeId, parentId])

    useEffect(() => {
        if (isOpen && tree) {
            tree.events.emit('menuopen', { parentId, nodeId })
        }
    }, [tree, isOpen, nodeId, parentId])

    const toggleRef = useMergeRefs([refs.setReference, item.ref, forwardedRef])

    useImperativeHandle(
        forwardedRef,
        () => {
            return {
                handleDropdownOpen: () => {
                    setIsOpen(true)
                    onOpen?.(true)
                },
                handleDropdownClose: () => {
                    setIsOpen(false)
                    onOpen?.(false)
                },
            }
        },
        [onOpen],
    )

    const toggleProps = {
        ...getReferenceProps(
            parent.getItemProps({
                ...rest,
                onFocus(event: FocusEvent<HTMLElement>) {
                    rest.onFocus?.(event)
                    setHasFocusInside(false)
                    parent.setHasFocusInside(true)
                },
            }),
        ),
        ...(trigger === 'context'
            ? {
                  onContextMenu: (e: MouseEvent<HTMLElement>) => {
                      e.preventDefault()
                      handleOpen(true)
                  },
              }
            : {}),
    }

    return (
        <FloatingNode id={nodeId}>
            {!isNested ? (
                <DropdownToggle
                    ref={toggleRef}
                    role={'menuitem'}
                    data-open={isOpen ? '' : undefined}
                    data-focus-inside={hasFocusInside ? '' : undefined}
                    className={classNames(toggleClassName)}
                    disabled={disabled}
                    placement={placement}
                    renderTitle={renderTitle}
                    {...toggleProps}
                >
                    {title}
                </DropdownToggle>
            ) : (
                <li
                    ref={toggleRef}
                    tabIndex={parent.activeIndex === item.index ? 0 : -1}
                    data-open={isOpen ? '' : undefined}
                    data-nested={''}
                    data-focus-inside={hasFocusInside ? '' : undefined}
                    className={classNames(toggleClassName, 'outline-none')}
                    {...toggleProps}
                >
                    <DropdownSubItem>
                        {renderTitle ? renderTitle : title}
                    </DropdownSubItem>
                </li>
            )}
            <MenuContext.Provider
                value={{
                    activeIndex,
                    setActiveIndex,
                    getItemProps,
                    setHasFocusInside,
                    isOpen,
                }}
            >
                <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                    {isMounted && (
                        <FloatingPortal>
                            <FloatingFocusManager
                                context={context}
                                modal={false}
                                initialFocus={isNested ? -1 : 0}
                                returnFocus={!isNested}
                            >
                                <div
                                    ref={refs.setFloating}
                                    style={floatingStyles}
                                    {...getFloatingProps()}
                                    className="outline-none z-30"
                                >
                                    <ul
                                        className={classNames(
                                            'dropdown-menu min-w-[160px]',
                                            menuClass,
                                        )}
                                        style={styles}
                                    >
                                        {children}
                                    </ul>
                                </div>
                            </FloatingFocusManager>
                        </FloatingPortal>
                    )}
                </FloatingList>
            </MenuContext.Provider>
        </FloatingNode>
    )
})

DropdownMenu.displayName = 'DropdownMenu'

export default DropdownMenu
