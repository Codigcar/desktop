import { TouchableWithoutFeedbackProps } from 'react-native'
import { AllProps } from '../../theme'

type Size = 'small' | 'default' | 'large'
type Type = 'default' | 'primary' | 'secondary' | 'disabled' | 'outline'

export type Props = TouchableWithoutFeedbackProps & {
  title: string
  type?: Type
  icon?: JSX.Element
  size?: Size
}

export interface StylesMain {
  button: { size: Record<Size, AllProps>; type: Record<Type, AllProps> }
  text: { size: Record<Size, any>; type: Record<Type, AllProps> }
}
