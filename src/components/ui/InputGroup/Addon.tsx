import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { useForm } from '../Form/context'
import { useInputGroup } from '../InputGroup/context'
import { CONTROL_SIZES } from '../utils/constants'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type { Ref } from 'react'

export interface AddonProps extends CommonProps {
    size?: TypeAttributes.ControlSize
    ref?: Ref<HTMLDivElement>
}

const Addon = ({ ref, ...props }: AddonProps) => {
    const { size, children, className } = props

    const { controlSize } = useConfig()
    const formControlSize = useForm()?.size
    const inputGroupSize = useInputGroup()?.size

    const inputAddonSize =
        size || inputGroupSize || formControlSize || controlSize

    const addonClass = classNames(
        'input-addon',
        `input-addon-${inputAddonSize} ${CONTROL_SIZES[inputAddonSize].h}`,
        className,
    )

    return (
        <div ref={ref} className={addonClass}>
            {children}
        </div>
    )
}

export default Addon
