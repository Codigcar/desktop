import { App } from '../../utils/config'

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

export const styles = App.select<Styles>({
  default: {
    button,
    text,
  },
})
