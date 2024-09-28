import { forwardRef } from 'react'
import DropdownMenu from './DropdownMenu'
import { FloatingTree, useFloatingParentNodeId } from '@floating-ui/react'
import type { DropdownMenuProps, DropdownMenuRef } from './DropdownMenu'
import type { HTMLProps } from 'react'

export interface DropdownSubProps
    extends Omit<
        DropdownMenuProps,
        'trigger' | 'disabled' | 'activeKey'
    > {
    eventKey?: string
    id?: string
}

const DropdownSub = forwardRef<
    HTMLElement | DropdownMenuRef,
    DropdownSubProps & HTMLProps<HTMLElement>
>((props, ref) => {
    const parentId = useFloatingParentNodeId()

    if (parentId === null) {
        return (
            <FloatingTree>
                <DropdownMenu {...props} ref={ref} />
            </FloatingTree>
        )
    }

    return <DropdownMenu {...props} ref={ref} />
})

DropdownSub.displayName = 'DropdownSub'

export default DropdownSub
