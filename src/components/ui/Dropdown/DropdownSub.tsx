import DropdownMenu from './DropdownMenu'
import { FloatingTree, useFloatingParentNodeId } from '@floating-ui/react'
import type { DropdownMenuProps, DropdownMenuRef } from './DropdownMenu'
import type { HTMLProps, Ref } from 'react'

export interface DropdownSubProps
    extends Omit<DropdownMenuProps, 'trigger' | 'disabled' | 'activeKey'> {
    eventKey?: string
    id?: string
    ref?: Ref<HTMLElement | DropdownMenuRef>
}

const DropdownSub = ({
    ref,
    ...props
}: DropdownSubProps & HTMLProps<HTMLElement>) => {
    const parentId = useFloatingParentNodeId()

    if (parentId === null) {
        return (
            <FloatingTree>
                <DropdownMenu {...props} ref={ref} />
            </FloatingTree>
        )
    }

    return <DropdownMenu {...props} ref={ref} />
}

export default DropdownSub
