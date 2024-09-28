import {
    ReactNode,
    CSSProperties,
    // ElementType
} from 'react'

export interface CommonProps {
    id?: string
    className?: string
    children?: ReactNode
    style?: CSSProperties
}

export type WithProps = CommonProps

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace TypeAttributes {
    type Size = 'lg' | 'md' | 'sm' | 'xs'
    type Shape = 'round' | 'circle' | 'none'
    type Status = 'success' | 'warning' | 'danger' | 'info'
    type FormLayout = 'horizontal' | 'vertical' | 'inline'
    type ControlSize = 'lg' | 'md' | 'sm'
    type Direction = 'ltr' | 'rtl'
}

export type StepStatus = 'complete' | 'pending' | 'in-progress' | 'error'
