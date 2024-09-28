import appConfig from '@/configs/app.config'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import i18n from 'i18next'
import { dateLocales } from '@/locales'
import dayjs from 'dayjs'

type LocaleState = {
    currentLang: string
    setLang: (payload: string) => void
}

export const useLocaleStore = create<LocaleState>()(
    devtools(
        persist(
            (set) => ({
                currentLang: appConfig.locale,
                setLang: (lang: string) => {
                    const formattedLang = lang.replace(/-([a-z])/g, function (g) {
                        return g[1].toUpperCase()
                    })

                    i18n.changeLanguage(formattedLang)

                    dateLocales[formattedLang]()
                    .then(() => {
                        dayjs.locale(formattedLang)
                    })

                    return set({ currentLang: lang })
                },
            }),
            { name: 'locale' },
        ),
    ),
)
