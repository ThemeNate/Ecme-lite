export enum SIZES {
    XS = 'xs',
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export const CONTROL_SIZES: Record<
    SIZES,
    { h: string; w: string; minH: string; minW: string }
> = {
    [SIZES.XS]: {
        h: 'h-8',
        w: 'w-8',
        minH: 'min-h-8',
        minW: 'min-w-8',
    },
    [SIZES.SM]: {
        h: 'h-10',
        w: 'w-10',
        minH: 'min-h-10',
        minW: 'min-w-10',
    },
    [SIZES.MD]: {
        h: 'h-12',
        w: 'w-12',
        minH: 'min-h-12',
        minW: 'min-w-12',
    },
    [SIZES.LG]: {
        h: 'h-14',
        w: 'w-14',
        minH: 'min-h-14',
        minW: 'min-w-14',
    },
}

export const SEGMENT_SIZES: Record<
    SIZES,
    { h: string; w: string; minH: string; minW: string }
> = {
    [SIZES.XS]: {
        h: 'h-6',
        w: 'w-6',
        minH: 'min-h-6',
        minW: 'min-w-6',
    },
    [SIZES.SM]: {
        h: 'h-10',
        w: 'w-10',
        minH: 'min-h-10',
        minW: 'min-w-10',
    },
    [SIZES.MD]: {
        h: 'h-10',
        w: 'w-10',
        minH: 'min-h-10',
        minW: 'min-w-10',
    },
    [SIZES.LG]: {
        h: 'h-12',
        w: 'w-12',
        minH: 'min-h-12',
        minW: 'min-w-12',
    },
}

export const LAYOUT = {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
    INLINE: 'inline',
}

export const DIRECTIONS = {
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left',
}

export const SELECTION_MODES = {
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day',
}

export const PICKER_VIEWS = {
    YEAR: 'year',
    MONTH: 'month',
    DATE: 'date',
}

export const STATUS = {
    DANGER: 'danger',
    SUCCESS: 'success',
    WARNING: 'warning',
}

export const STEPS_STATUS = {
    COMPLETE: 'complete',
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    ERROR: 'error',
}

export const PLACEMENT = {
    TOP_START: 'top-start',
    TOP_CENTER: 'top-center',
    TOP_END: 'top-end',
    BOTTOM_START: 'bottom-start',
    BOTTOM_CENTER: 'bottom-center',
    BOTTOM_END: 'bottom-end',
    MIDDLE_START_TOP: 'middle-start-top',
    MIDDLE_START_BOTTOM: 'middle-start-bottom',
    MIDDLE_END_TOP: 'middle-end-top',
    MIDDLE_END_BOTTOM: 'middle-end-bottom',
}

export const DROPDOWN_ITEM_TYPE: Record<
    string,
    'default' | 'header' | 'divider' | 'custom'
> = {
    DEFAULT: 'default',
    HEADER: 'header',
    DIVIDER: 'divider',
    CUSTOM: 'custom',
}

export const DAY_DURATION = 86400000
