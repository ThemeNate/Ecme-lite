import navigationIcon from '@/configs/navigation-icon.config'
import type { ElementType, ComponentPropsWithRef } from 'react'

type VerticalMenuIconProps = {
    icon: string
    gutter: string
}

export const Icon = <T extends ElementType>({
    component,
    ...props
}: {
    header: T
} & ComponentPropsWithRef<T>) => {
    const Component = component
    return <Component {...props} />
}

const VerticalMenuIcon = ({ icon }: VerticalMenuIconProps) => {
    if (typeof icon !== 'string' && !icon) {
        return <></>
    }

    return (
        <>
            {navigationIcon[icon] && (
                <span className={`text-2xl`}>{navigationIcon[icon]}</span>
            )}
        </>
    )
}

export default VerticalMenuIcon
