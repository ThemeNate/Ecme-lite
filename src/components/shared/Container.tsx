import classNames from 'classnames'
import { CommonProps } from '@/@types/common'
import type { ElementType, Ref } from 'react'

interface ContainerProps extends CommonProps {
    asElement?: ElementType
    ref?: Ref<HTMLElement>
}

const Container = (props: ContainerProps) => {
    const {
        className,
        children,
        asElement: Component = 'div',
        ref,
        ...rest
    } = props

    return (
        <Component
            ref={ref}
            className={classNames('container mx-auto', className)}
            {...rest}
        >
            {children}
        </Component>
    )
}

export default Container
