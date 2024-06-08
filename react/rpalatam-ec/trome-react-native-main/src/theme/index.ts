import {
  BoxProps as BoxDefaultProps,
  ColorProps,
  OpacityProps,
  TextShadowProps,
  TypographyProps as TypographyDefaultProps,
  VisibleProps,
  createTheme,
} from '@shopify/restyle'
import { Platform } from 'react-native'

import { App } from '../utils/config'

const base = 16

const sizes = {
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
}

const isGestion = App.key === 'gestion'

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
    900: '#1c2029',
  },
  trueGray: {
    200: '#E5E5E5',
    400: '#A3A3A3',
    700: '#404040',
  },
  black: {
    default: '#000',
    100: '#050505',
    800: '#272727',
    900: '#1c1c1c',
  },
  'gray-200': '#EEEDE7',
  'red-500': '#EF4444',
  'red-800': '#841b24',
  salmon: {
    100: '#F5E9DE',
    200: '#f1ded0',
  },
  'blue-400': '#0089ff',
  'blue-teal': '#1781a8',
}

const colorNames = [
  'primary',
  'secondary',
  'background.1',
  'background.2',
  'background.3',
  'background.4',
  'stroke.1',
  'text.1',
  'text.2',
  'text.3',
  'text.4',
  'text.5',
  'text.6',
] as const

type ColorName = typeof colorNames[number]

type ColorModes = {
  [key in ColorName]?: {
    light: string
    dark?: string
  }
}

const colors: ColorModes = App.select({
  depor: { primary: { light: '#C9DA2A' } },
  elcomercio: {
    primary: { light: '#FFCB05' },
    secondary: { light: '#AD9130' },
    'background.1': { light: '#FFFFFF', dark: '#1B1B1B' },
    'background.2': { light: '#FFFFFF', dark: '#272727' },
    'background.3': { light: '#FFFDF4', dark: '#484848' },
    'background.4': { light: '#FFF7D5', dark: '#8E8E8E' },
    'stroke.1': { light: '#C1C1C1', dark: '#8E8E8E' },
    'text.1': { light: '#665202', dark: '#C1C1C1' },
    'text.2': { light: '#000000', dark: '#FDFDFD' },
    'text.3': { light: '#3C3C3C', dark: '#FFFFFF' },
    'text.4': { light: '#8E8E8E', dark: '#C1C1C1' },
    'text.5': { light: '#000000', dark: '#FFFFFF' },
    'text.6': { light: '#FFFFFF', dark: '#000000' },
  },
  gestion: { primary: { light: '#F5E9DE' } },
  peru21: { primary: { light: '#0E6DC1' } },
  trome: { primary: { light: '#FF8400' } },
})

const lightColors = Object.keys(colors).reduce((prevColors, color) => {
  const value = colors[color as ColorName]
  if (!value) return { ...prevColors, [color]: palette['red-500'] }
  return { ...prevColors, [color]: value.light }
}, {}) as Record<ColorName, string>

const darkColors = Object.keys(colors).reduce((prevColors, color) => {
  const value = colors[color as ColorName]?.dark
  if (!value) return prevColors
  return { ...prevColors, [color]: value }
}, {}) as Record<ColorName, string>

// Based in Tailwind default config https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const theme = createTheme({
  breakpoints: {},
  colors: {
    ...lightColors,
    transparent: palette.transparent,
    brand: colors.primary?.light || palette['red-500'],
    button:
      App.key === 'elcomercio' ? palette.black.default : palette['blue-400'],
    background: isGestion ? palette.salmon[100] : palette.white.default,
    backgroundSecondary: isGestion
      ? palette.salmon[200]
      : palette.coolGray[200],
    link: isGestion ? palette['blue-teal'] : palette['blue-400'],
    lightGray: palette['gray-200'],
    danger: palette['red-500'],
    badgeFont: isGestion ? palette['red-800'] : palette.black.default,
    text: palette.coolGray[500],
    textTransparent: palette.trueGray[400],
    heading: palette.coolGray[800],
    white: palette.white.default,
    black: palette.black[100],
    separator: isGestion ? palette.coolGray[300] : palette.trueGray[200],
    'black-800': palette.black[800],
    'blue-400': palette['blue-400'],
    'coolGray-100': palette.coolGray[100],
    'coolGray-200': palette.coolGray[200],
    'coolGray-300': palette.coolGray[300],
    'coolGray-400': palette.coolGray[400],
    'coolGray-500': palette.coolGray[500],
    'coolGray-600': palette.coolGray[600],
    'coolGray-700': palette.coolGray[700],
    'coolGray-800': palette.coolGray[800],
    'trueGray-200': palette.trueGray[200],
    'red-800': palette['red-800'],
  },
  spacing: { ...sizes },
  borderRadii: {
    none: 0,
    xs: base * 0.125, // 2
    sm: base * 0.25, // 4
    md: base * 0.375, // 6
    lg: base * 0.5, // 8
    xl: base * 0.75, // 10
    full: 9999,
  },
  // Text style props https://reactnative.dev/docs/text-style-props
  fontFamily: {
    display:
      Platform.OS === 'ios'
        ? 'NotoSerif-SemiCondensedBold'
        : 'NotoSerifSC-Bold',
    body: Platform.OS === 'ios' ? 'Avenir' : 'Roboto',
  },
  fontSize: {
    xxs: base * 0.625, // 10
    xs: base * 0.75, // 12
    sm: base * 0.875, // 14
    base: base * 1, // 16
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
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
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
})

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    ...darkColors,
    'coolGray-100': palette.coolGray[800],
    'coolGray-200': palette.coolGray[700],
    'coolGray-300': palette.coolGray[600],
    'coolGray-500': palette.coolGray[400],
    'coolGray-700': palette.coolGray[200],
    'coolGray-800': palette.coolGray[100],
    'trueGray-200': palette.trueGray[700],
    background: isGestion ? palette.coolGray[900] : palette.black[800],
    backgroundSecondary: isGestion ? palette.coolGray[700] : palette.black[900],
    text: palette.white[100],
    textTransparent: `${palette.white.default}b3`,
    heading: palette['gray-200'],
    badgeFont: isGestion ? palette.white.default : palette.black.default,
    separator: isGestion ? palette.coolGray[700] : palette.trueGray[700],
  },
}

export type BoxProps = BoxDefaultProps<Theme>

interface TypographyCustomProps {
  fontFamily?: keyof Theme['fontFamily']
  fontSize?: keyof Theme['fontSize']
  fontWeight?: keyof Theme['fontWeight']
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

export type AllProps = BoxProps & TextProps

export type Theme = typeof theme
export default theme
