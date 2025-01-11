import { useState } from 'react'
import classNames from '../utils/classNames'
import useTimeout from '../hooks/useTimeout'
import {
    HiCheckCircle,
    HiInformationCircle,
    HiExclamation,
    HiXCircle,
} from 'react-icons/hi'
import { motion } from 'framer-motion'
import CloseButton from '../CloseButton'
import StatusIcon from '../StatusIcon'
import type { TypeAttributes, CommonProps } from '../@types/common'
import type { ReactNode, MouseEvent, Ref } from 'react'

export interface AlertProps extends CommonProps {
    closable?: boolean
    customClose?: ReactNode | string
    customIcon?: ReactNode | string
    duration?: number
    title?: ReactNode | string
    onClose?: (e?: MouseEvent<HTMLDivElement>) => void
    showIcon?: boolean
    triggerByToast?: boolean
    type?: TypeAttributes.Status
    ref?: Ref<HTMLDivElement>
}

const DEFAULT_TYPE = 'warning'

const TYPE_MAP = {
    success: {
        backgroundColor: 'bg-success-subtle',
        titleColor: 'text-success',
        textColor: 'text-success',
        iconColor: 'text-success',
        icon: <HiCheckCircle />,
    },
    info: {
        backgroundColor: 'bg-info-subtle',
        titleColor: 'text-info',
        textColor: 'text-info',
        iconColor: 'text-info',
        icon: <HiInformationCircle />,
    },
    warning: {
        backgroundColor: 'bg-warning-subtle',
        titleColor: 'text-warning',
        textColor: 'text-warning',
        iconColor: 'text-warning',
        icon: <HiExclamation />,
    },
    danger: {
        backgroundColor: 'bg-error-subtle',
        titleColor: 'text-error',
        textColor: 'text-error',
        iconColor: 'text-error',
        icon: <HiXCircle />,
    },
}

const TYPE_ARRAY: TypeAttributes.Status[] = [
    'success',
    'danger',
    'info',
    'warning',
]

const Alert = (props: AlertProps) => {
    const {
        children,
        className,
        closable = false,
        customClose,
        customIcon,
        duration = 3000,
        title = null,
        onClose,
        ref,
        showIcon = false,
        triggerByToast = false,
        ...rest
    } = props

    const getType = () => {
        const { type = DEFAULT_TYPE } = props
        if (TYPE_ARRAY.includes(type)) {
            return type
        }
        return DEFAULT_TYPE
    }

    const type = getType()
    const typeMap = TYPE_MAP[type]

    const [display, setDisplay] = useState('show')

    const { clear } = useTimeout(
        onClose as () => void,
        duration,
        (duration as number) > 0,
    )

    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        setDisplay('hiding')
        onClose?.(e)
        clear()
        if (!triggerByToast) {
            setTimeout(() => {
                setDisplay('hide')
            }, 400)
        }
    }

    const renderClose = () => {
        return (
            <div
                className="cursor-pointer"
                role="presentation"
                onClick={(e) => handleClose(e)}
            >
                {customClose || (
                    <CloseButton
                        resetDefaultClass
                        className="text-lg outline-none"
                    />
                )}
            </div>
        )
    }

    const alertClass = classNames(
        'alert',
        typeMap.backgroundColor,
        typeMap.textColor,
        !title ? 'font-semibold' : '',
        closable ? 'justify-between' : '',
        closable && !title ? 'items-center' : '',
        !triggerByToast && 'rounded-xl',

        className,
    )

    if (display === 'hide') {
        return null
    }

    return (
        <motion.div
            ref={ref}
            className={alertClass}
            initial={{ opacity: 1 }}
            animate={display === 'hiding' ? 'exit' : 'animate'}
            transition={{ duration: 0.25, type: 'tween' }}
            variants={{
                animate: {
                    opacity: 1,
                },
                exit: {
                    opacity: 0,
                },
            }}
            {...rest}
        >
            <div
                className={classNames(
                    'flex gap-2',
                    !title && children ? 'items-center' : '',
                    title && children ? 'mt-0.5' : '',
                )}
            >
                {showIcon && (
                    <StatusIcon
                        iconColor={typeMap.iconColor}
                        custom={customIcon}
                        type={type}
                    />
                )}
                <div>
                    {title ? (
                        <div
                            className={classNames(
                                'font-semibold text-lg mb-1',
                                typeMap.titleColor,
                            )}
                        >
                            {title}
                        </div>
                    ) : null}
                    {children}
                </div>
            </div>
            {closable ? renderClose() : null}
        </motion.div>
    )
}

export default Alert
