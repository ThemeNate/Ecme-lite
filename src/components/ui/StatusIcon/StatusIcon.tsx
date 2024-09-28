import {
    HiCheckCircle,
    HiInformationCircle,
    HiExclamation,
    HiXCircle,
} from 'react-icons/hi'
import type { TypeAttributes, CommonProps } from '../@types/common'
import type { ReactNode } from 'react'

export interface StatusIconProps extends CommonProps {
    type: TypeAttributes.Status
    custom?: ReactNode | JSX.Element
    iconColor?: string
}

const ICONS: Record<
    TypeAttributes.Status,
    {
        color: string
        icon: JSX.Element
    }
> = {
    success: {
        color: 'text-success',
        icon: <HiCheckCircle />,
    },
    info: {
        color: 'text-info',
        icon: <HiInformationCircle />,
    },
    warning: {
        color: 'text-warning',
        icon: <HiExclamation />,
    },
    danger: {
        color: 'text-error',
        icon: <HiXCircle />,
    },
}

const StatusIcon = (props: StatusIconProps) => {
    const { type = 'info', custom, iconColor } = props

    const icon = ICONS[type]

    return (
        <span className={`text-2xl ${iconColor || icon.color}`}>
            {custom || icon.icon}
        </span>
    )
}

export default StatusIcon
