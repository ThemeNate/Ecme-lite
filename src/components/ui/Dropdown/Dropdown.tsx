import { forwardRef } from 'react'
import { DropdownContextProvider } from './context/dropdownContext'
import DropdownMenu from './DropdownMenu'
import { FloatingTree, useFloatingParentNodeId } from '@floating-ui/react'
import type { DropdownMenuProps, DropdownMenuRef } from './DropdownMenu'
import type { HTMLProps } from 'react'

export interface DropdownProps extends DropdownMenuProps {
    eventKey?: string
    id?: string
}

export type DropdownRef = DropdownMenuRef

const Dropdown = forwardRef<
    DropdownRef,
    DropdownProps & HTMLProps<HTMLElement>
>(({ activeKey, ...props }, ref) => {
    const parentId = useFloatingParentNodeId()

    if (parentId === null) {
        return (
            <DropdownContextProvider value={{ activeKey }}>
                <FloatingTree>
                    <DropdownMenu {...props} ref={ref} />
                </FloatingTree>
            </DropdownContextProvider>
        )
    }

    return <DropdownMenu {...props} ref={ref} />
})

Dropdown.displayName = 'Dropdown'

export default Dropdown
