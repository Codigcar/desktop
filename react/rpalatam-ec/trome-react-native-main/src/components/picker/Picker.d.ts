import {
  Picker as RNPicker,
  PickerProps as RNPickerProps,
} from '@react-native-picker/picker'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

type PickerOption = {
  label: string
  value: string
}

type PickerLabelProps = {
  options: PickerOption[]
  disabled?: boolean
  placeholder?: string
  selectedValue?: string
  containerStyle?: StyleProp<ViewStyle>
}

type PickerBaseProps = React.PropsWithChildren<RNPickerProps<string>>

type Props = RNPickerProps<string> & {
  options: PickerOption[]
  disabled?: boolean
  placeholder?: string
  labelContainerStyle?: PickerLabelProps['containerStyle']
}

type PickerProps = React.PropsWithChildren<Props>

type PickerRef = RNPicker<string> & {
  focus: () => void
}

type PickerComponent = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<PickerProps> & React.RefAttributes<PickerRef>
>
