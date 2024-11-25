import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import type { Direction } from '@/@types/theme'

function useDirection(): [
    direction: Direction,
    setDirection: (dir: Direction) => void,
] {
    const direction = useThemeStore((state) => state.direction)
    const setDirection = useThemeStore((state) => state.setDirection)

    useEffect(() => {
        if (window === undefined) {
            return
        }
        const root = window.document.documentElement
        root.setAttribute('dir', direction)
    }, [direction])

    return [direction, setDirection]
}

export default useDirection
