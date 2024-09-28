import { create } from 'zustand'

type RouteKeyState = {
    currentRouteKey: string
}

type RouteKeyAction = {
    setCurrentRouteKey: (payload: RouteKeyState['currentRouteKey']) => void
}

export const useRouteKeyStore = create<RouteKeyState & RouteKeyAction>(
    (set) => ({
        currentRouteKey: '',
        setCurrentRouteKey: (payload: string) =>
            set(() => ({ currentRouteKey: payload })),
    }),
)
