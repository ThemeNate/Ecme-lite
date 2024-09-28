import { createContext, useContext } from 'react'
import type { TypeAttributes } from '../@types/common'

export type FormContextProps = {
    size?: TypeAttributes.ControlSize
    layout?: TypeAttributes.FormLayout
    labelWidth?: string | number
}

const FormContext = createContext<FormContextProps | null>(null)

export const FormContextProvider = FormContext.Provider

export const FormContextConsumer = FormContext.Consumer

export function useForm() {
    return useContext(FormContext)
}

export type FormItemContextProps = {
    invalid?: boolean
}

const FormItemContext = createContext<FormItemContextProps | null>(null)

export const FormItemContextProvider = FormItemContext.Provider

export const FormItemContextConsumer = FormItemContext.Consumer

export function useFormItem() {
    return useContext(FormItemContext)
}

export default FormContext
