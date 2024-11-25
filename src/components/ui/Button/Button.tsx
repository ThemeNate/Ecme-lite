import { forwardRef } from 'react'
import classNames from '../utils/classNames'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { CONTROL_SIZES, SIZES } from '../utils/constants'
import { Spinner } from '../Spinner'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type {
    ReactNode,
    ComponentPropsWithRef,
    MouseEvent,
    ElementType,
} from 'react'

export interface ButtonProps
    extends CommonProps,
        Omit<ComponentPropsWithRef<'button'>, 'onClick'> {
    asElement?: ElementType
    active?: boolean
    block?: boolean
    clickFeedback?: boolean
    customColorClass?: (state: {
        active: boolean
        unclickable: boolean
    }) => string
    disabled?: boolean
    icon?: string | ReactNode
    loading?: boolean
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    shape?: TypeAttributes.Shape
    size?: TypeAttributes.Size
    variant?: 'solid' | 'plain' | 'default'
    iconAlignment?: 'start' | 'end'
}

type ButtonColor = {
    bgColor: string
    hoverColor: string
    activeColor: string
    textColor: string
}

const radiusShape: Record<TypeAttributes.Shape, string> = {
    round: 'rounded-xl',
    circle: 'rounded-full',
    none: 'rounded-none',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        asElement: Component = 'button',
        active = false,
        block = false,
        children,
        className,
        clickFeedback = true,
        customColorClass,
        disabled,
        icon,
        loading = false,
        shape = 'round',
        size,
        variant = 'default',
        iconAlignment = 'start',
        ...rest
    } = props
    const { controlSize, ui } = useConfig()
    const formControlSize = useForm()?.size
    const inputGroupSize = useInputGroup()?.size
    const defaultClass = 'button'
    const sizeIconClass = 'inline-flex items-center justify-center'

    const buttonSize = size || inputGroupSize || formControlSize || controlSize
    const feedback = !ui?.button?.disableClickFeedback || clickFeedback
    const unclickable = disabled || loading

    const getButtonSize = () => {
        let sizeClass = ''
        switch (buttonSize) {
            case SIZES.LG:
                sizeClass = classNames(
                    CONTROL_SIZES.lg.h,
                    radiusShape[shape],
                    icon && !children
                        ? `${CONTROL_SIZES.lg.w} ${sizeIconClass} text-2xl`
                        : 'px-8 py-2 text-base',
                )
                break
            case SIZES.SM:
                sizeClass = classNames(
                    CONTROL_SIZES.sm.h,
                    shape === 'round' ? 'rounded-xl' : radiusShape[shape],
                    icon && !children
                        ? `${CONTROL_SIZES.sm.w} ${sizeIconClass} text-lg`
                        : 'px-3 py-2 text-sm',
                )
                break
            case SIZES.XS:
                sizeClass = classNames(
                    CONTROL_SIZES.xs.h,
                    shape === 'round' ? 'rounded-lg' : radiusShape[shape],
                    icon && !children
                        ? `${CONTROL_SIZES.xs.w} ${sizeIconClass} text-base`
                        : 'px-3 py-1 text-xs',
                )
                break
            default:
                sizeClass = classNames(
                    CONTROL_SIZES.md.h,
                    radiusShape[shape],
                    icon && !children
                        ? `${CONTROL_SIZES.md.w} ${sizeIconClass} text-xl`
                        : 'px-5 py-2',
                )
                break
        }
        return sizeClass
    }

    const disabledClass = 'opacity-50 cursor-not-allowed'

    const solidColor = () => {
        const btn = {
            bgColor: active ? `bg-primary-deep` : `bg-primary`,
            textColor: 'text-neutral',
            hoverColor: active ? '' : `hover:bg-primary-mild`,
            activeColor: ``,
        }
        return getBtnColor(btn)
    }

    const plainColor = () => {
        const btn = {
            bgColor: active
                ? ``
                : `dark:primary-mild dark:bg-opacity-20`,
            textColor: ``,
            hoverColor: active ? '' : `hover:text-primary-mild`,
            activeColor: `dark:active:primary-mild dark:active:bg-opacity-40`,
        }
        return getBtnColor(btn)
    }

    const defaultColor = () => {
        const btn = {
            bgColor: active
                ? `bg-gray-100 border border-gray-300 dark:bg-gray-500 dark:border-gray-500`
                : `bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700`,
            textColor: `text-gray-600 dark:text-gray-100`,
            hoverColor: active
                ? ''
                : `ring-primary dark:ring-white hover:border-primary dark:hover:border-white hover:ring-1 hover:text-primary dark:hover:text-white dark:hover:bg-transparent`,
            activeColor: ``,
        }
        return getBtnColor(btn)
    }

    const getBtnColor = ({
        bgColor,
        hoverColor,
        activeColor,
        textColor,
    }: ButtonColor) => {
        return `${bgColor} ${
            unclickable ? disabledClass : hoverColor + ' ' + activeColor
        } ${textColor}`
    }

    const btnColor = () => {
        switch (variant) {
            case 'solid':
                return solidColor()
            case 'plain':
                return plainColor()
            case 'default':
                return defaultColor()
            default:
                return defaultColor()
        }
    }

    const classes = classNames(
        defaultClass,
        btnColor(),
        getButtonSize(),
        className,
        block ? 'w-full' : '',
        feedback && !unclickable && 'button-press-feedback',
        customColorClass?.({
            active,
            unclickable,
        }),
    )

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const { onClick } = props
        if (unclickable) {
            e.preventDefault()
            return
        }
        onClick?.(e)
    }

    const renderChildren = () => {
        if (loading && children) {
            return (
                <span className="flex items-center justify-center">
                    <Spinner enableTheme={false} className="mr-1" />
                    {children}
                </span>
            )
        }

        if (icon && !children && loading) {
            return <Spinner enableTheme={false} />
        }

        if (icon && !children && !loading) {
            return <>{icon}</>
        }

        if (icon && children && !loading) {
            return (
                <span className="flex gap-1 items-center justify-center">
                    {iconAlignment === 'start' && (
                        <span className="text-lg">{icon}</span>
                    )}
                    <span>{children}</span>
                    {iconAlignment === 'end' && (
                        <span className="text-lg">{icon}</span>
                    )}
                </span>
            )
        }

        return <>{children}</>
    }

    return (
        <Component
            ref={ref}
            className={classes}
            {...rest}
            onClick={handleClick}
        >
            {renderChildren()}
        </Component>
    )
})

Button.displayName = 'Button'

export default Button
