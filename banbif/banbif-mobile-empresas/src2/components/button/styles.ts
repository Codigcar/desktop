import type { AllProps } from '../../theme'
import type { StylesMain } from './types'

const button: StylesMain['button'] = {
  size: {
    small: { height: 42 },
    default: { height: 48 },
    large: { height: 56 },
  },
  type: {
    default: { backgroundColor: 'black' },
    primary: { backgroundColor: 'link' },
    secondary: { backgroundColor: 'coolGray-200' },
    disabled: { backgroundColor: 'trueGray-600' },
    outline: { backgroundColor: 'white' },
  },
}

const text: StylesMain['text'] = {
  size: {
    small: { fontSize: 16 },
    default: { fontSize: 18 },
    large: { fontSize: 20 },
  },
  type: {
    default: { color: 'white' },
    primary: { color: 'white' },
    secondary: { color: 'text' },
    disabled: { color: 'coolGray-600' },
    outline: { color: 'primary' },
  },
}

const shadow: AllProps = {
  elevation: 3,
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.32,
  shadowRadius: 6,
}

export const styles: StylesMain = {
  button: {
    size: button.size,
    type: {
      default: {
        backgroundColor: 'black',
        borderRadius: 'lg',
      },
      primary: {
        backgroundColor: 'primary',
        borderRadius: 'lg',
      },
      secondary: {
        backgroundColor: 'secondary',
        borderRadius: 'lg',
      },
      disabled: {
        backgroundColor: 'trueGray-600',
        borderRadius: 'lg',
      },
      outline: {
        backgroundColor: 'white',
        borderRadius: 'lg',
        borderWidth: 1,
        borderColor: 'primary',
      },
    },
  },
  text: {
    size: text.size,
    type: {
      default: { color: 'white' },
      primary: { color: 'white' },
      secondary: { color: 'white' },
      disabled: { color: 'coolGray-900' },
      outline: { color: 'primary' },
    },
  },
}
