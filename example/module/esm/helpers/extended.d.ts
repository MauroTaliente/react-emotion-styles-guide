type G = any;
declare const _default: {
    accentColor: ({ theme }: G) => any;
    animation: {
        none: string;
        spin: string;
        ping: string;
        pulse: string;
        bounce: string;
    };
    aria: {
        checked: string;
        disabled: string;
        expanded: string;
        hidden: string;
        pressed: string;
        readonly: string;
        required: string;
        selected: string;
    };
    aspectRatio: {
        auto: string;
        square: string;
        video: string;
    };
    backdropBlur: ({ theme }: G) => any;
    backdropBrightness: ({ theme }: G) => any;
    backdropContrast: ({ theme }: G) => any;
    backdropGrayscale: ({ theme }: G) => any;
    backdropHueRotate: ({ theme }: G) => any;
    backdropInvert: ({ theme }: G) => any;
    backdropOpacity: ({ theme }: G) => any;
    backdropSaturate: ({ theme }: G) => any;
    backdropSepia: ({ theme }: G) => any;
    backgroundColor: ({ theme }: G) => any;
    backgroundImage: {
        none: string;
        'gradient-to-t': string;
        'gradient-to-tr': string;
        'gradient-to-r': string;
        'gradient-to-br': string;
        'gradient-to-b': string;
        'gradient-to-bl': string;
        'gradient-to-l': string;
        'gradient-to-tl': string;
    };
    backgroundOpacity: ({ theme }: G) => any;
    backgroundPosition: {
        bottom: string;
        center: string;
        left: string;
        'left-bottom': string;
        'left-top': string;
        right: string;
        'right-bottom': string;
        'right-top': string;
        top: string;
    };
    backgroundSize: {
        auto: string;
        cover: string;
        contain: string;
    };
    blur: {
        0: string;
        none: string;
        sm: string;
        DEFAULT: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
    };
    borderColor: ({ theme }: G) => any;
    borderOpacity: ({ theme }: G) => any;
    borderRadius: {
        none: string;
        sm: string;
        DEFAULT: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        full: string;
    };
    borderSpacing: ({ theme }: G) => any;
    borderWidth: {
        DEFAULT: string;
        0: string;
        2: string;
        4: string;
        8: string;
    };
    boxShadow: {
        sm: string;
        DEFAULT: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        inner: string;
        none: string;
    };
    boxShadowColor: ({ theme }: G) => any;
    brightness: {
        0: string;
        50: string;
        75: string;
        90: string;
        95: string;
        100: string;
        105: string;
        110: string;
        125: string;
        150: string;
        200: string;
    };
    caretColor: ({ theme }: G) => any;
    colors: ({ theme: { colors } }: G) => {
        inherit: any;
        current: any;
        transparent: any;
        black: any;
        white: any;
        slate: any;
        gray: any;
        zinc: any;
        neutral: any;
        stone: any;
        red: any;
        orange: any;
        amber: any;
        yellow: any;
        lime: any;
        green: any;
        emerald: any;
        teal: any;
        cyan: any;
        sky: any;
        blue: any;
        indigo: any;
        violet: any;
        purple: any;
        fuchsia: any;
        pink: any;
        rose: any;
    };
    columns: {
        auto: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        '3xs': string;
        '2xs': string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
        '6xl': string;
        '7xl': string;
    };
    container: {};
    content: {
        none: string;
    };
    contrast: {
        0: string;
        50: string;
        75: string;
        100: string;
        125: string;
        150: string;
        200: string;
    };
    cursor: {
        auto: string;
        default: string;
        pointer: string;
        wait: string;
        text: string;
        move: string;
        help: string;
        'not-allowed': string;
        none: string;
        'context-menu': string;
        progress: string;
        cell: string;
        crosshair: string;
        'vertical-text': string;
        alias: string;
        copy: string;
        'no-drop': string;
        grab: string;
        grabbing: string;
        'all-scroll': string;
        'col-resize': string;
        'row-resize': string;
        'n-resize': string;
        'e-resize': string;
        's-resize': string;
        'w-resize': string;
        'ne-resize': string;
        'nw-resize': string;
        'se-resize': string;
        'sw-resize': string;
        'ew-resize': string;
        'ns-resize': string;
        'nesw-resize': string;
        'nwse-resize': string;
        'zoom-in': string;
        'zoom-out': string;
    };
    divideColor: ({ theme }: G) => any;
    divideOpacity: ({ theme }: G) => any;
    divideWidth: ({ theme }: G) => any;
    dropShadow: {
        sm: string;
        DEFAULT: string[];
        md: string[];
        lg: string[];
        xl: string[];
        '2xl': string;
        none: string;
    };
    fill: ({ theme }: G) => any;
    flex: {
        1: string;
        auto: string;
        initial: string;
        none: string;
    };
    flexBasis: ({ theme }: G) => any;
    flexGrow: {
        0: string;
        DEFAULT: string;
    };
    flexShrink: {
        0: string;
        DEFAULT: string;
    };
    fontFamily: {
        sans: string[];
        serif: string[];
        mono: string[];
    };
    fontSize: {
        xs: (string | {
            lineHeight: string;
        })[];
        sm: (string | {
            lineHeight: string;
        })[];
        base: (string | {
            lineHeight: string;
        })[];
        lg: (string | {
            lineHeight: string;
        })[];
        xl: (string | {
            lineHeight: string;
        })[];
        '2xl': (string | {
            lineHeight: string;
        })[];
        '3xl': (string | {
            lineHeight: string;
        })[];
        '4xl': (string | {
            lineHeight: string;
        })[];
        '5xl': (string | {
            lineHeight: string;
        })[];
        '6xl': (string | {
            lineHeight: string;
        })[];
        '7xl': (string | {
            lineHeight: string;
        })[];
        '8xl': (string | {
            lineHeight: string;
        })[];
        '9xl': (string | {
            lineHeight: string;
        })[];
    };
    fontWeight: {
        thin: string;
        extralight: string;
        light: string;
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
        extrabold: string;
        black: string;
    };
    gap: ({ theme }: G) => any;
    gradientColorStops: ({ theme }: G) => any;
    grayscale: {
        0: string;
        DEFAULT: string;
    };
    gridAutoColumns: {
        auto: string;
        min: string;
        max: string;
        fr: string;
    };
    gridAutoRows: {
        auto: string;
        min: string;
        max: string;
        fr: string;
    };
    gridColumn: {
        auto: string;
        'span-1': string;
        'span-2': string;
        'span-3': string;
        'span-4': string;
        'span-5': string;
        'span-6': string;
        'span-7': string;
        'span-8': string;
        'span-9': string;
        'span-10': string;
        'span-11': string;
        'span-12': string;
        'span-full': string;
    };
    gridColumnEnd: {
        auto: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        13: string;
    };
    gridColumnStart: {
        auto: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        13: string;
    };
    gridRow: {
        auto: string;
        'span-1': string;
        'span-2': string;
        'span-3': string;
        'span-4': string;
        'span-5': string;
        'span-6': string;
        'span-full': string;
    };
    gridRowEnd: {
        auto: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
    };
    gridRowStart: {
        auto: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
    };
    gridTemplateColumns: {
        none: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
    };
    gridTemplateRows: {
        none: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
    };
    height: ({ theme }: G) => any;
    hueRotate: {
        0: string;
        15: string;
        30: string;
        60: string;
        90: string;
        180: string;
    };
    inset: ({ theme }: G) => any;
    invert: {
        0: string;
        DEFAULT: string;
    };
    keyframes: {
        spin: {
            to: {
                transform: string;
            };
        };
        ping: {
            '75%, 100%': {
                transform: string;
                opacity: string;
            };
        };
        pulse: {
            '50%': {
                opacity: string;
            };
        };
        bounce: {
            '0%, 100%': {
                transform: string;
                animationTimingFunction: string;
            };
            '50%': {
                transform: string;
                animationTimingFunction: string;
            };
        };
    };
    letterSpacing: {
        tighter: string;
        tight: string;
        normal: string;
        wide: string;
        wider: string;
        widest: string;
    };
    lineHeight: {
        none: string;
        tight: string;
        snug: string;
        normal: string;
        relaxed: string;
        loose: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
    };
    listStyleType: {
        none: string;
        disc: string;
        decimal: string;
    };
    margin: ({ theme }: G) => any;
    maxHeight: ({ theme }: G) => any;
    maxWidth: ({ breakPoints }: G) => {
        none: string;
        0: string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
        '6xl': string;
        '7xl': string;
        full: string;
        min: string;
        max: string;
        fit: string;
        prose: string;
    };
    minHeight: {
        0: string;
        full: string;
        screen: string;
        min: string;
        max: string;
        fit: string;
    };
    minWidth: {
        0: string;
        full: string;
        min: string;
        max: string;
        fit: string;
    };
    objectPosition: {
        bottom: string;
        center: string;
        left: string;
        'left-bottom': string;
        'left-top': string;
        right: string;
        'right-bottom': string;
        'right-top': string;
        top: string;
    };
    opacity: {
        0: string;
        5: string;
        10: string;
        20: string;
        25: string;
        30: string;
        40: string;
        50: string;
        60: string;
        70: string;
        75: string;
        80: string;
        90: string;
        95: string;
        100: string;
    };
    order: {
        first: string;
        last: string;
        none: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
    };
    outlineColor: ({ theme }: G) => any;
    outlineOffset: {
        0: string;
        1: string;
        2: string;
        4: string;
        8: string;
    };
    outlineWidth: {
        0: string;
        1: string;
        2: string;
        4: string;
        8: string;
    };
    padding: ({ theme }: G) => any;
    placeholderColor: ({ theme }: G) => any;
    placeholderOpacity: ({ theme }: G) => any;
    ringColor: ({ theme }: G) => any;
    ringOffsetColor: ({ theme }: G) => any;
    ringOffsetWidth: {
        0: string;
        1: string;
        2: string;
        4: string;
        8: string;
    };
    ringOpacity: ({ theme }: G) => any;
    ringWidth: {
        DEFAULT: string;
        0: string;
        1: string;
        2: string;
        4: string;
        8: string;
    };
    rotate: {
        0: string;
        1: string;
        2: string;
        3: string;
        6: string;
        12: string;
        45: string;
        90: string;
        180: string;
    };
    saturate: {
        0: string;
        50: string;
        100: string;
        150: string;
        200: string;
    };
    scale: {
        0: string;
        50: string;
        75: string;
        90: string;
        95: string;
        100: string;
        105: string;
        110: string;
        125: string;
        150: string;
    };
    screens: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
    };
    scrollMargin: ({ theme }: G) => any;
    scrollPadding: ({ theme }: G) => any;
    sepia: {
        0: string;
        DEFAULT: string;
    };
    skew: {
        0: string;
        1: string;
        2: string;
        3: string;
        6: string;
        12: string;
    };
    space: ({ theme }: G) => any;
    spacing: {
        px: string;
        0: string;
        0.5: string;
        1: string;
        1.5: string;
        2: string;
        2.5: string;
        3: string;
        3.5: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
        9: string;
        10: string;
        11: string;
        12: string;
        14: string;
        16: string;
        20: string;
        24: string;
        28: string;
        32: string;
        36: string;
        40: string;
        44: string;
        48: string;
        52: string;
        56: string;
        60: string;
        64: string;
        72: string;
        80: string;
        96: string;
    };
    stroke: ({ theme }: G) => any;
    strokeWidth: {
        0: string;
        1: string;
        2: string;
    };
    supports: {};
    data: {};
    textColor: ({ theme }: G) => any;
    textDecorationColor: ({ theme }: G) => any;
    textDecorationThickness: {
        auto: string;
        'from-font': string;
        0: string;
        1: string;
        2: string;
        4: string;
        8: string;
    };
    textIndent: ({ theme }: G) => any;
    textOpacity: ({ theme }: G) => any;
    textUnderlineOffset: {
        auto: string;
        0: string;
        1: string;
        2: string;
        4: string;
        8: string;
    };
    transformOrigin: {
        center: string;
        top: string;
        'top-right': string;
        right: string;
        'bottom-right': string;
        bottom: string;
        'bottom-left': string;
        left: string;
        'top-left': string;
    };
    transitionDelay: {
        0: string;
        75: string;
        100: string;
        150: string;
        200: string;
        300: string;
        500: string;
        700: string;
        1000: string;
    };
    transitionDuration: {
        DEFAULT: string;
        0: string;
        75: string;
        100: string;
        150: string;
        200: string;
        300: string;
        500: string;
        700: string;
        1000: string;
    };
    transitionProperty: {
        none: string;
        all: string;
        DEFAULT: string;
        colors: string;
        opacity: string;
        shadow: string;
        transform: string;
    };
    transitionTimingFunction: {
        DEFAULT: string;
        linear: string;
        in: string;
        out: string;
        'in-out': string;
    };
    translate: ({ theme }: G) => any;
    width: ({ theme }: G) => any;
    willChange: {
        auto: string;
        scroll: string;
        contents: string;
        transform: string;
    };
    zIndex: {
        auto: string;
        0: string;
        10: string;
        20: string;
        30: string;
        40: string;
        50: string;
    };
};
export default _default;
