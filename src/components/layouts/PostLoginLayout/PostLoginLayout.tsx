import { useMemo, lazy } from 'react'
import {
    LAYOUT_COLLAPSIBLE_SIDE,
} from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'
import type { LazyExoticComponent } from 'react'
import type { LayoutType } from '@/@types/theme'

type Layouts = Record<
    string,
    LazyExoticComponent<<T extends CommonProps>(props: T) => JSX.Element>
>

interface PostLoginLayoutProps extends CommonProps {
    layoutType: LayoutType
}

const layouts: Layouts = {
    [LAYOUT_COLLAPSIBLE_SIDE]: lazy(
        () => import('./components/CollapsibleSide'),
    ),
}

const PostLoginLayout = ({ layoutType, children }: PostLoginLayoutProps) => {
    const AppLayout = useMemo(() => {
        if (!layouts[layoutType]) {
            return layouts[Object.keys(layouts)[0]]
        }

        return layouts[layoutType]
    }, [layoutType])

    return <AppLayout>{children}</AppLayout>
}

export default PostLoginLayout
