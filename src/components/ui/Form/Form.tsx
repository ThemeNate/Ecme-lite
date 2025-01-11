import FormContainer from './FormContainer'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import type { FormContainerProps } from './FormContainer'

export type FormProps = ComponentPropsWithoutRef<'form'> &
    FormContainerProps & {
        containerClassName?: string
        ref?: Ref<HTMLFormElement>
    }

export const Form = (props: FormProps) => {
    const {
        children,
        containerClassName,
        labelWidth,
        layout,
        size,
        ref,
        ...rest
    } = props

    return (
        <form ref={ref} {...rest}>
            <FormContainer
                className={containerClassName}
                labelWidth={labelWidth}
                layout={layout}
                size={size}
            >
                {children}
            </FormContainer>
        </form>
    )
}

export default Form
