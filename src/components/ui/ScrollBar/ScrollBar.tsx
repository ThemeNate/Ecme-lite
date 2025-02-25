import SimpleBarReact from 'simplebar-react'
import type { Props } from 'simplebar-react'
import type SimpleBarCore from 'simplebar-core'
import type { Ref } from 'react'

import type { TypeAttributes } from '../@types/common'

export interface ScrollBarProps extends Props {
    direction?: TypeAttributes.Direction
    ref?: Ref<SimpleBarCore>
}

export type ScrollBarRef = SimpleBarCore

const ScrollBar = ({ ref, ...props }: ScrollBarProps) => {
    return <SimpleBarReact ref={ref} {...props} />
}

export default ScrollBar
