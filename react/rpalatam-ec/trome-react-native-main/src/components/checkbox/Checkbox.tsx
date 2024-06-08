/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect } from 'react'
import { TextInput, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { CheckboxProps } from './types'
import Box from '../box'

const { View } = Box

const Checkbox = React.forwardRef<TextInput, CheckboxProps>(
  ({ children, onValueChange, value = false, style, ...rest }, ref) => {
    const handlePress = useCallback(() => {
      onValueChange(!value)
    }, [onValueChange, value])

    useEffect(() => {
      const _ref = ref as React.RefObject<TextInput & { value: boolean }>
      if (_ref?.current) {
        _ref.current.value = value
      }
    }, [ref, value])

    return (
      <TouchableWithoutFeedback
        {...rest}
        onPress={() => {
          handlePress()
        }}>
        <View flexDirection="row" alignItems="center">
          <TextInput ref={ref} editable={false} style={{ display: 'none' }} />
          <View
            width={26}
            height={26}
            borderWidth={2}
            borderColor="coolGray-300"
            borderRadius="sm"
            marginRight={!children ? '0' : '0.5'}
            style={style}>
            <Icon
              name="check"
              size={22}
              color={value ? '#0089ff' : 'transparent'}
            />
          </View>
          {!children ? null : <View flex={1}>{children}</View>}
        </View>
      </TouchableWithoutFeedback>
    )
  },
)

export default Checkbox
