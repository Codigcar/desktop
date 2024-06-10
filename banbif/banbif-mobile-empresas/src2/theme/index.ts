import {
  BoxProps as BoxDefaultProps,
  ColorProps,
  OpacityProps,
  TextShadowProps,
  TypographyProps as TypographyDefaultProps,
  VisibleProps,
  createTheme,
} from '@shopify/restyle'

const palette = {
  white: {
    default: '#FFFFFF',
    100: '#F5F5F5',
  },
  transparent: '#00000000',
  coolGray: {
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#2e3443',
    800: '#1F2937',
    900: '#BEBDBC',
  },
  trueGray: {
    100: '#E3E3E3',
    200: '#E5E5E5',
    300: '#D6D6D6',
    400: '#A3A3A3',
    600: '#ECECEC',
    700: '#404040',
    800: '#FAFAFA',
    900: '#57595B',
    1000: '#F9F9F9',
  },
  black: {
    default: '#000',
    100: '#050505',
    300: '#2E2B26',
    800: '#272727',
    900: '#1c1c1c',
  },
  blue: {
    100: '#10B0F5',
  },
  'gray-200': '#EEEDE7',
  'red-500': '#EF4444',
  'red-800': '#841b24',
  salmon: {
    100: '#F5E9DE',
    200: '#f1ded0',
  },
  'blue-400': '#0089ff',
  primary: '#BD1714',
  yellow: '#fff000',
  toastSuccess: '#42C72C',
  toastWarning: '#F4A814',
  toastError: '#EB5757',
  danger: '#EB5757',
  green: {
    100: '#00B383',
  },
  blackWithOpacity: 'rgba(0, 0, 0, 0.8)',
}

const base = 16

const theme = createTheme({
  colors: {
    primary: palette.primary,
    secondary: palette.primary,
    yellow: palette.yellow,
    white: palette.white.default,
    'gray-900': palette.coolGray[900],
    black: palette.black[100],
    link: palette['blue-400'],
    'coolGray-100': palette.coolGray[100],
    'coolGray-200': palette.coolGray[200],
    'coolGray-300': palette.coolGray[300],
    'coolGray-400': palette.coolGray[400],
    'coolGray-500': palette.coolGray[500],
    'coolGray-600': palette.coolGray[600],
    'coolGray-700': palette.coolGray[700],
    'coolGray-800': palette.coolGray[800],
    'coolGray-900': palette.coolGray[900],
    'trueGray-200': palette.trueGray[200],
    'trueGray-400': palette.trueGray[400],
    'trueGray-600': palette.trueGray[600],
    'trueGray-800': palette.trueGray[800],
    'trueGray-300': palette.trueGray[300],
    'trueGray-100': palette.trueGray[100],
    'trueGray-900': palette.trueGray[900],
    'trueGray-1000': palette.trueGray[1000],
    'black-300': palette.black[300],
    text: palette.coolGray[500],
    toastSuccess: palette.toastSuccess,
    toastWarning: palette.toastWarning,
    toastError: palette.toastError,
    danger: palette.danger,
    'blue-100': palette.blue[100],
    transparent: palette.transparent,
    // green: palette.green[100]
    'green-100': palette.green[100],
    blackWithOpacity: palette.blackWithOpacity
  },
  breakpoints: {},
  spacing: {
    '0': base * 0, // 0
    '0.25': base * 0.25, // 4
    '0.5': base * 0.5, // 8
    '0.75': base * 0.75, // 12
    '1': base * 1, // 16
    '1.25': base * 1.25, // 20
    '1.5': base * 1.5, // 24
    '2': base * 2, // 32
    '2.5': base * 2.5, // 40
    '3': base * 3, // 48
    '4': base * 4, // 64
    '5': base * 5, // 30
    '6': base * 6, // 96
    '8': base * 8, // 128
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    none: 0,
    xs: base * 0.125, // 2
    sm: base * 0.25, // 4
    md: base * 0.375, // 6
    lg: base * 0.5, // 8
    xl: base * 0.75, // 12
    xxl: base * 1.25, // 20
    full: 9999,
  },
  fontFamily: {
    display: 'serif',
    body: 'Roboto',
  },
  fontSize: {
    xxs: base * 0.625, // 10
    xs: base * 0.75, // 12
    sm: base * 0.875, // 14
    base: 16, // 16
    lg: base * 1.125, // 18
    xl: base * 1.25, // 20
    '2xl': base * 1.5, // 24
    '3xl': base * 1.875, // 30,
    '4xl': base * 2.25, // 36
    '5xl': base * 3, // 48
    '6xl': base * 3.75, // 60
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300', //*
    normal: '400',
    medium: '500', //*
    semibold: '600',
    bold: '700', //*
    extrabold: '800',
    black: '900', //*
  },
  letterSpacing: {
    tighter: base * -0.05,
    tight: base * -0.025,
    normal: 0,
    wide: base * 0.025,
    wider: base * 0.05,
    widest: base * 0.1,
  },
  lineHeight: {
    none: base * 1,
    tight: base * 1.25,
    snug: base * 1.375,
    normal: base * 1.5,
    relaxed: base * 1.625,
    loose: base * 2,
    '3': base * 0.75,
    '4': base * 1,
    '5': base * 1.25,
    '6': base * 1.5,
    '7': base * 1.75,
    '8': base * 2,
    '9': base * 2.25,
    '10': base * 2.5,
  },
  textVariants: {
    header: {
      fontFamily: 'roboto',
    },
    body: {},
    title: {},
    defaults: {},
  },
})

interface TypographyCustomProps {
  fontFamily?: keyof Theme['fontFamily']
  fontSize?: keyof Theme['fontSize']
  letterSpacing?: keyof Theme['letterSpacing']
  lineHeight?: keyof Theme['lineHeight']
}

export type TypographyProps = TypographyCustomProps &
  Omit<TypographyDefaultProps<Theme>, keyof TypographyCustomProps>

export type TextProps = ColorProps<Theme> &
  OpacityProps<Theme> &
  TextShadowProps<Theme> &
  TypographyProps &
  VisibleProps<Theme>

export type BoxProps = BoxDefaultProps<Theme>
export type AllProps = BoxProps & TextProps

export type Theme = typeof theme
export default theme
