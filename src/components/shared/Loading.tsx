import Spinner from '@/components/ui/Spinner'
import classNames from 'classnames'
import type { CommonProps } from '@/@types/common'
import type { ElementType, ReactNode } from 'react'

interface BaseLoadingProps extends CommonProps {
    asElement?: ElementType
    customLoader?: ReactNode
    loading: boolean
    spinnerClass?: string
}

interface LoadingProps extends BaseLoadingProps {
    type?: 'default' | 'cover'
}

const DefaultLoading = (props: BaseLoadingProps) => {
    const {
        loading,
        children,
        spinnerClass,
        className,
        asElement: Component = 'div',
        customLoader,
    } = props

    return loading ? (
        <Component
            className={classNames(
                !customLoader && 'flex items-center justify-center h-full',
                className,
            )}
        >
            {customLoader ? (
                <>{customLoader}</>
            ) : (
                <Spinner className={spinnerClass} size={40} />
            )}
        </Component>
    ) : (
        <>{children}</>
    )
}

const CoveredLoading = (props: BaseLoadingProps) => {
    const {
        loading,
        children,
        spinnerClass,
        className,
        asElement: Component = 'div',
        customLoader,
    } = props

    return (
        <Component className={classNames(loading ? 'relative' : '', className)}>
            {children}
            {loading && (
                <div className="w-full h-full bg-white/50 dark:bg-gray-800/60 absolute inset-0" />
            )}
            {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    {customLoader ? (
                        <>{customLoader}</>
                    ) : (
                        <Spinner className={spinnerClass} size={40} />
                    )}
                </div>
            )}
        </Component>
    )
}

const Loading = ({
    type = 'default',
    loading = false,
    asElement = 'div',
    ...rest
}: LoadingProps) => {
    switch (type) {
        case 'default':
            return (
                <DefaultLoading
                    loading={loading}
                    asElement={asElement}
                    {...rest}
                />
            )
        case 'cover':
            return (
                <CoveredLoading
                    loading={loading}
                    asElement={asElement}
                    {...rest}
                />
            )
        default:
            return (
                <DefaultLoading
                    loading={loading}
                    asElement={asElement}
                    {...rest}
                />
            )
    }
}

export default Loading
