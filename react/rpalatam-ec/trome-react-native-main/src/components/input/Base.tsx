import { useTheme } from '@shopify/restyle'
import { useField } from '@unform/core'
import React, { useCallback, useEffect, useRef } from 'react'
import { StyleProp, TextInput, TextStyle } from 'react-native'

import * as styles from './styles'
import { InputBaseProps } from './types'
import Box from '../box'
import type { Theme } from '../../theme'

const InputBase: React.FC<InputBaseProps> = ({
  name,
  PrefixComponent,
  SuffixComponent,
  defaultValue,
  onChangeText,
  style,
  ...rest
}) => {
  const { colors } = useTheme<Theme>()

  const { registerField, fieldName } = useField(name)
  const inputRef = useRef<TextInput & { value?: string }>(null)
  const inputStyles: StyleProp<TextStyle> = [
    styles.field.base,
    {
      color: colors['coolGray-800'],
      paddingLeft: !PrefixComponent ? 0 : 8,
      paddingRight: !SuffixComponent ? 0 : 8,
    },
    style,
  ]

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue
  }, [defaultValue])

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
      clearValue: (ref) => {
        ref.value = ''
        ref.clear()
      },
    })
  }, [fieldName, registerField])

  const handleChangeText = useCallback(
    (text: string) => {
      if (inputRef.current) inputRef.current.value = text
      onChangeText?.(text)
    },
    [onChangeText],
  )

  return (
    <Box.View flexDirection="row" alignItems="center">
      {!PrefixComponent ? null : <PrefixComponent />}
      <TextInput
        ref={inputRef}
        style={inputStyles}
        onChangeText={handleChangeText}
        defaultValue={inputRef.current?.value ?? defaultValue}
        {...rest}
      />
      {!SuffixComponent ? null : <SuffixComponent />}
    </Box.View>
  )
}

export default InputBase
