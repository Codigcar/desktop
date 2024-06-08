import { StyleProp, ViewStyle } from 'react-native'

export type CheckboxProps = {
  onValueChange: (value: boolean) => void
  value?: boolean
  children?: JSX.Element
  disabled?: boolean
  testID?: string
  style?: StyleProp<ViewStyle>
}
