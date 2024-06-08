import { App } from '../../utils/config'

import type { AllProps } from '../../theme'
import type { Styles } from './types'

const button: Styles['button'] = {
  size: {
    small: { height: 42 },
    default: { height: 48 },
    large: { height: 56 },
  },
  type: {
    default: { backgroundColor: 'black' },
    primary: { backgroundColor: 'link' },
    secondary: { backgroundColor: 'coolGray-200' },
  },
}

const text: Styles['text'] = {
  size: {
    small: { fontSize: 'base' },
    default: { fontSize: 'lg' },
    large: { fontSize: 'xl' },
  },
  type: {
    default: { color: 'white' },
    primary: { color: 'white' },
    secondary: { color: 'text' },
  },
}

const shadow: AllProps = {
  elevation: 3,
  shadowColor: 'black',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.32,
  shadowRadius: 6,
}

export const styles = App.select<Styles>({
  elcomercio: {
    button: {
      size: button.size,
      type: {
        default: {
          backgroundColor: 'black',
          borderRadius: 'md',
          ...shadow,
        },
        primary: {
          backgroundColor: 'primary',
          borderRadius: 'md',
          ...shadow,
        },
        secondary: {
          backgroundColor: 'secondary',
          borderRadius: 'md',
          ...shadow,
        },
      },
    },
    text: {
      size: text.size,
      type: {
        default: { color: 'white' },
        primary: { color: 'black' },
        secondary: { color: 'white' },
      },
    },
  },
  default: { button, text },
})
