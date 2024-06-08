import { useTheme } from '@shopify/restyle'
import { useField } from '@unform/core'
import React, { useMemo, useState } from 'react'

import InputBase from './Base'
import * as styles from './styles'
import { App } from '../../utils/config'
import Box from '../box'
import type { Theme } from '../../theme'
import type { InputProps } from './types'

const { View } = Box

const Input: React.FC<InputProps> = ({
  name,
  disabled,
  onBlur,
  onFocus,
  onValueChange,
  type,
  ...rest
}) => {
  const { error } = useField(name)
  const [isFocus, setIsFocus] = useState(false)
  const { colors } = useTheme<Theme>()
  const color =
    App.key === 'elcomercio' ? colors['text.3'] : colors['coolGray-800']

  const keyboardType = useMemo(() => {
    switch (type) {
      case 'email':
        return 'email-address'
      case 'phone':
        return 'phone-pad'
      case 'text':
      default:
        return 'default'
    }
  }, [type])

  return (
    <View
      opacity={disabled ? 0.5 : 1}
      borderRadius="sm"
      borderColor={error ? 'danger' : isFocus ? 'link' : 'coolGray-300'}
      alignItems="center"
      flexDirection="row"
      {...styles.container}>
      <InputBase
        accessibilityState={{ disabled }}
        name={name}
        editable={!disabled}
        keyboardType={keyboardType}
        onBlur={(event) => {
          setIsFocus(false)
          onBlur?.(event)
        }}
        onChangeText={onValueChange}
        onFocus={(event) => {
          setIsFocus(true)
          onFocus?.(event)
        }}
        selectionColor={colors.link}
        style={[styles.field.input, { color }]}
        {...rest}
      />
    </View>
  )
}

export default Input
