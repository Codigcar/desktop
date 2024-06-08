import type { ColorValue, StyleProp, ViewStyle } from 'react-native'

export type RadioGroupProps = {
  defaultValue?: string
  name?: string
  onChangeValue?: (value: string | undefined) => void
}

export type RadioGroupRef = {
  reset(): void
  setValue(value?: string): void
  value: string | undefined
}

export type RadioProps = {
  value: string
  checked?: boolean
  color?: ColorValue
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}
