import { HiX } from 'react-icons/hi'
import classNames from 'classnames'
import type { CommonProps } from '../@types/common'
import type { MouseEvent, ButtonHTMLAttributes, Ref } from 'react'

export interface CloseButtonProps
    extends CommonProps,
        ButtonHTMLAttributes<HTMLButtonElement> {
    absolute?: boolean
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    ref?: Ref<HTMLButtonElement>
    resetDefaultClass?: boolean
}

const CloseButton = (props: CloseButtonProps) => {
    const { absolute, className, resetDefaultClass, ref, ...rest } = props
    const closeButtonAbsoluteClass = 'absolute z-10'

    const closeButtonClass = classNames(
        !resetDefaultClass && 'close-button button-press-feedback',
        absolute && closeButtonAbsoluteClass,
        className,
    )

    return (
        <button ref={ref} className={closeButtonClass} type="button" {...rest}>
            <HiX />
        </button>
    )
}

export default CloseButton
