import { forwardRef } from 'react'
import FormContainer from './FormContainer'
import type { ComponentPropsWithoutRef } from 'react'
import type { FormContainerProps } from './FormContainer'

export type FormProps = ComponentPropsWithoutRef<'form'> &
    FormContainerProps & {
        containerClassName?: string
    }

export const Form = forwardRef<HTMLFormElement, FormProps>(
    (props: FormProps, ref) => {
        const {
            children,
            containerClassName,
            labelWidth,
            layout,
            size,
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
    },
)

Form.displayName = 'Form'

export default Form
