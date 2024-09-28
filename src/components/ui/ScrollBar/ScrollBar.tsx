import { forwardRef } from 'react'
import SimpleBarReact from 'simplebar-react'
import type { Props } from 'simplebar-react'
import type SimpleBarCore from 'simplebar-core'

import type { TypeAttributes } from '../@types/common'

export interface ScrollBarProps extends Props {
    direction?: TypeAttributes.Direction
}

export type ScrollBarRef = SimpleBarCore

const ScrollBar = forwardRef<ScrollBarRef, ScrollBarProps>((props, ref) => {
    return <SimpleBarReact ref={ref} {...props} />
})

ScrollBar.displayName = 'ScrollBar'

export default ScrollBar
