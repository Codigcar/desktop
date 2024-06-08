import { Platform, StyleSheet } from 'react-native'

import { App } from '../../utils/config'
import type { AllProps } from '../../theme'

export const container = App.select<AllProps>({
  elcomercio: {
    borderWidth: 1,
    paddingHorizontal: '1',
  },
  default: {
    borderWidth: 2,
    paddingHorizontal: '0.5',
    paddingVertical: Platform.OS === 'ios' ? '0.75' : '0.5',
  },
})

export const field = StyleSheet.create({
  base: {
    flex: 1,
    fontSize: 16,
    marginVertical: 0,
    paddingVertical: 0,
  },
  input: {
    fontWeight: '500',
    height: App.select({
      elcomercio: 40,
      default: Platform.OS === 'ios' ? 16 * 1.25 : 16 * 1.5,
    }),
  },
})
