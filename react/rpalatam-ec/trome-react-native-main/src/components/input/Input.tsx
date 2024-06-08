import { useTheme } from '@shopify/restyle'
import { useField } from '@unform/core'
import React, { useMemo, useState } from 'react'
import { Platform } from 'react-native'

import InputBase from './Base'
import * as styles from './styles'
import { Theme } from '../../theme'
import Box from '../box'
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
      px="0.5"
      py={Platform.OS === 'ios' ? '0.75' : '0.5'}
      opacity={disabled ? 0.5 : 1}
      borderRadius="sm"
      borderWidth={2}
      borderColor={error ? 'danger' : isFocus ? 'link' : 'coolGray-300'}
      alignItems="center"
      flexDirection="row">
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
        style={[styles.field.input, { color: colors['coolGray-800'] }]}
        {...rest}
      />
    </View>
  )
}

export default Input
