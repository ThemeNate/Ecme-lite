import classNames from '@/utils/classNames'
import { HEADER_HEIGHT } from '@/constants/theme.constant'
import type { ReactNode } from 'react'
import type { CommonProps } from '@/@types/common'

interface HeaderProps extends CommonProps {
    headerStart?: ReactNode
    headerEnd?: ReactNode
    headerMiddle?: ReactNode
    container?: boolean
    wrapperClass?: string
}

const Header = (props: HeaderProps) => {
    const {
        headerStart,
        headerEnd,
        headerMiddle,
        className,
        container,
        wrapperClass,
    } = props

    return (
        <header className={classNames('header', className)}>
            <div
                className={classNames(
                    'header-wrapper',
                    container && 'container mx-auto',
                    wrapperClass,
                )}
                style={{ height: HEADER_HEIGHT }}
            >
                <div className="header-action header-action-start">
                    {headerStart}
                </div>
                {headerMiddle && (
                    <div className="header-action header-action-middle">
                        {headerMiddle}
                    </div>
                )}
                <div className="header-action header-action-end">
                    {headerEnd}
                </div>
            </div>
        </header>
    )
}

export default Header
