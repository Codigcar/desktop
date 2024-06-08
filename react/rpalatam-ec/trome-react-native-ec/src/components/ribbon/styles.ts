import { App } from '../../utils/config'
import type { AllProps } from '../../theme'

export const container = App.select<AllProps>({
  elcomercio: {
    backgroundColor: 'background.1',
    borderBottomColor: 'primary',
    borderBottomWidth: 1,
  },
  default: { backgroundColor: 'background' },
})

export const innerContainer = App.select<AllProps>({
  elcomercio: { height: 64 },
  default: {
    height: 48,
    justifyContent: 'center',
  },
})

export const titleStyle = App.select<AllProps>({
  elcomercio: {
    color: 'text.1',
    textAlign: 'left',
    fontSize: 'lg',
    fontWeight: 'black',
  },
  default: {
    flex: 1,
    textAlign: 'center',
    color: 'coolGray-700',
    fontWeight: 'bold',
  },
})
