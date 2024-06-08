import { useTheme } from '@shopify/restyle'
import { useField } from '@unform/core'
import React, { useEffect, useRef } from 'react'
import { TextInput } from 'react-native'

import { CheckboxInputProps } from './types'
import { Theme } from '../../theme'
import Checkbox from '../checkbox'

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  name,
  style,
  ...rest
}) => {
  const inputRef = useRef<TextInput>(null)
  const { colors } = useTheme<Theme>()
  const { fieldName, registerField, error } = useField(name)
  const inputStyle = [
    {
      borderColor: error ? colors.danger : colors['coolGray-300'],
    },
    style,
  ]

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
      clearValue() {
        return
      },
    })
  }, [fieldName, registerField])

  return <Checkbox ref={inputRef} style={inputStyle} {...rest} />
}

export default CheckboxInput
