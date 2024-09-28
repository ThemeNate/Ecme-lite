import { useState } from 'react'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import Arrow from './Arrow'
import type { CommonProps } from '../@types/common'
import type { ArrowPlacement } from './Arrow'
import type { ReactNode } from 'react'
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useHover,
    useFocus,
    useDismiss,
    useRole,
    useInteractions,
    FloatingPortal,
} from '@floating-ui/react'

export interface TooltipProps extends CommonProps {
    isOpen?: boolean
    placement?: ArrowPlacement
    title: string | ReactNode
    wrapperClass?: string
    disabled?: boolean
}

const Tooltip = (props: TooltipProps) => {
    const {
        className,
        children,
        isOpen = false,
        placement = 'top',
        title,
        wrapperClass,
        disabled,
    } = props

    const [tooltipOpen, setTooltipOpen] = useState<boolean>(isOpen)

    const tooltipColor = {
        background: 'bg-gray-800 dark:bg-black',
        arrow: 'text-gray-800 dark:text-black',
    }

    const defaultTooltipClass = `tooltip ${tooltipColor.background}`

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: (open) => {
            if (!disabled) {
                setTooltipOpen(open)
            }
        },
        placement,
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(7),
            flip({
                fallbackAxisSideDirection: 'start',
            }),
            shift(),
        ],
    })

    const hover = useHover(context, { move: false })
    const focus = useFocus(context)
    const dismiss = useDismiss(context)
    const role = useRole(context, { role: 'tooltip' })

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        focus,
        dismiss,
        role,
    ])

    return (
        <>
            <span
                ref={refs.setReference}
                {...getReferenceProps()}
                className={classNames('tooltip-wrapper', wrapperClass)}
            >
                {children}
            </span>
            <FloatingPortal>
                {tooltipOpen && (
                    <AnimatePresence>
                        <motion.div
                            ref={refs.setFloating}
                            className={classNames(
                                defaultTooltipClass,
                                className,
                            )}
                            initial={{
                                opacity: 0,
                                visibility: 'hidden',
                            }}
                            animate={
                                tooltipOpen
                                    ? {
                                          opacity: 1,
                                          visibility: 'visible',
                                      }
                                    : {
                                          opacity: 0,
                                          visibility: 'hidden',
                                      }
                            }
                            transition={{
                                duration: 0.15,
                                type: 'tween',
                            }}
                            style={floatingStyles}
                            {...getFloatingProps()}
                        >
                            <span>{title}</span>
                            <Arrow
                                placement={context.placement}
                                color={tooltipColor.arrow}
                            />
                        </motion.div>
                    </AnimatePresence>
                )}
            </FloatingPortal>
        </>
    )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
