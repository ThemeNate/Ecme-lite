export type HorizontalMenuMeta =
    | {
          layout: 'default'
      }
    | {
          layout: 'columns'
          showColumnTitle?: boolean
          columns: 1 | 2 | 3 | 4 | 5
      }
    | {
          layout: 'tabs'
          columns: 1 | 2 | 3 | 4 | 5
      }

export interface NavigationTree {
    key: string
    path: string
    isExternalLink?: boolean
    title: string
    translateKey: string
    icon: string
    type: 'title' | 'collapse' | 'item'
    authority: string[]
    subMenu: NavigationTree[]
    description?: string
    meta?: {
        horizontalMenu?: HorizontalMenuMeta
        description?: {
            translateKey: string
            label: string
        }
    }
}
