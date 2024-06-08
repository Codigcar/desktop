import React from 'react'

import Input from './Input'
import PasswordInput from './Password'
import type { InputProps, PasswordProps } from './types'

interface InputSubComponents {
  Password: React.FC<PasswordProps>
}

const InputComponent: React.FC<InputProps> & InputSubComponents = (props) => (
  <Input {...props} />
)
InputComponent.Password = PasswordInput

export { default as DateInput } from './Date'
export { default as CheckboxInput } from './CheckboxInput'
export { default as SelectInput } from './Select'
export default InputComponent
