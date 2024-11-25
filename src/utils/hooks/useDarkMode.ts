import { useEffect } from 'react'
import { THEME_ENUM } from '@/constants/theme.constant'
import { useThemeStore } from '@/store/themeStore'
import type { Mode } from '@/@types/theme'

function useDarkMode(): [
    isEnabled: boolean,
    onModeChange: (mode: Mode) => void,
] {
    const mode = useThemeStore((state) => state.mode)
    const setMode = useThemeStore((state) => state.setMode)

    const { MODE_DARK, MODE_LIGHT } = THEME_ENUM

    const isEnabled = mode === MODE_DARK

    const onModeChange = (mode: Mode) => {
        setMode(mode)
    }

    useEffect(() => {
        if (window === undefined) {
            return
        }
        const root = window.document.documentElement
        root.classList.remove(isEnabled ? MODE_LIGHT : MODE_DARK)
        root.classList.add(isEnabled ? MODE_DARK : MODE_LIGHT)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnabled])

    return [isEnabled, onModeChange]
}

export default useDarkMode
