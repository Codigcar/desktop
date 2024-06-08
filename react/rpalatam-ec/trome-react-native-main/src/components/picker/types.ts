import { PickerProps as RNPickerProps } from '@react-native-picker/picker'

export type Option = {
  label: string
  value: string | number
}

export type PickerProps = RNPickerProps & {
  options: Option[]
  defaultLabel: string
}
