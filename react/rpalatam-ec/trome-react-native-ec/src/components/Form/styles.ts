import { App } from '../../utils/config'
import type { AllProps } from '../../theme'

export const container = App.select<AllProps>({
  elcomercio: { minHeight: 82 },
  default: { minHeight: 96 },
})

export const error = App.select<AllProps>({
  elcomercio: { textAlign: 'right' },
  default: {},
})

export const label = App.select<AllProps>({
  elcomercio: {
    color: 'text.4',
    fontSize: 'sm',
  },
  default: {
    color: 'coolGray-500',
    fontWeight: 'bold',
  },
})
