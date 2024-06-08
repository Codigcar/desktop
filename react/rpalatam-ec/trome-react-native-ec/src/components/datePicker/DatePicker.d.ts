import {
  AndroidNativeProps,
  IOSNativeProps,
} from '@react-native-community/datetimepicker'
import { StyleProp, ViewStyle } from 'react-native'

type DatePickerProps = (
  | Omit<IOSNativeProps, 'display' | 'value'>
  | Omit<AndroidNativeProps, 'value'>
) & {
  containerStyle?: StyleProp<ViewStyle>
  dateFormat?: Intl.DateTimeFormatOptions
  disabled?: boolean
  onChangeDate?: (date: Date) => void
  textColor?: string
  value?: Date
}

type DatePickerLabelProps = Pick<
  DatePickerProps,
  'containerStyle' | 'dateFormat' | 'value'
>

type DatePickerComponent = React.FC<DatePickerProps>
