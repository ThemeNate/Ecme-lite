import ConfigProvider from '@/components/ui/ConfigProvider'
import { themeConfig } from '@/configs/theme.config'
import useLocale from '@/utils/hooks/useLocale'
import type { CommonProps } from '@/@types/common'

const Theme = (props: CommonProps) => {

    const { locale } = useLocale()

    return (
        <ConfigProvider
            value={{
                locale: locale,
                ...themeConfig,
            }}
        >
            {props.children}
        </ConfigProvider>
    )
}

export default Theme
