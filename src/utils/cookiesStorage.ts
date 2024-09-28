import Cookies from 'js-cookie'

type StateStorage = {
    getItem: (name: string) => string | null | Promise<string | null>
    setItem: (name: string, value: string) => void | Promise<void>
    removeItem: (name: string) => void | Promise<void>
}

const cookiesStorage: StateStorage = {
    getItem: (name: string) => {
        return Cookies.get(name) ?? null
    },
    setItem: (name: string, value: string, expires: number | Date = 1) => {
        Cookies.set(name, value, { expires })
    },
    removeItem: (name: string) => {
        Cookies.remove(name)
    },
}

export default cookiesStorage
