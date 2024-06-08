import { TouchableWithoutFeedbackProps } from 'react-native'

import type { AllProps } from '../../theme'

type Size = 'small' | 'default' | 'large'
type Type = 'default' | 'primary' | 'secondary'

export type Props = TouchableWithoutFeedbackProps & {
  title: string
  type?: Type
  icon?: JSX.Element
  size?: Size
}

export interface Styles {
  button: { size: Record<Size, AllProps>; type: Record<Type, AllProps> }
  text: { size: Record<Size, AllProps>; type: Record<Type, AllProps> }
}
