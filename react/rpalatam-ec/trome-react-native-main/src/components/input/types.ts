import { TextInputProps } from 'react-native'

import type { CheckboxProps } from '../checkbox/types'

export type InputBaseProps = TextInputProps & {
  name: string
  PrefixComponent?: React.ComponentType
  SuffixComponent?: React.ComponentType
}

export type InputProps = Omit<InputBaseProps, 'onChangeText'> & {
  disabled?: boolean
  type?: 'email' | 'phone' | 'text'
  onValueChange?: (value: string) => void
}

export type PasswordProps = Omit<InputProps, 'SuffixComponent'>

export type CheckboxInputProps = CheckboxProps & {
  name: string
}
