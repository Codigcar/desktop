import { Picker as RNPicker } from '@react-native-picker/picker'
import React, { useCallback } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import BasePicker from './Base'
import Label from './Label'
import Box from '../box'
import type { PickerProps, PickerRef } from './Picker'

const hiddenPickerStyle: StyleProp<ViewStyle> = {
  display: 'none',
  transform: [{ scale: 0 }],
}

const Picker: React.ForwardRefRenderFunction<PickerRef, PickerProps> = (
  {
    children,
    disabled,
    labelContainerStyle,
    options,
    placeholder,
    prompt,
    selectedValue,
    ...rest
  },
  forwardedRef,
) => {
  const handlePress = useCallback(() => {
    const ref = forwardedRef as React.RefObject<PickerRef>
    ref.current?.focus()
  }, [forwardedRef])

  return (
    <TouchableWithoutFeedback
      testID="open-button"
      disabled={disabled}
      onPress={handlePress}>
      {!children ? (
        <Label
          options={options}
          containerStyle={labelContainerStyle}
          disabled={disabled}
          placeholder={placeholder}
          selectedValue={selectedValue}
        />
      ) : (
        children
      )}
      <Box.View style={hiddenPickerStyle}>
        <BasePicker
          ref={forwardedRef}
          selectedValue={selectedValue}
          accessibilityState={{ disabled }}
          {...rest}>
          <RNPicker.Item
            value="required-placeholder"
            label={prompt || 'Seleccionar'}
            enabled={false}
          />
          {options.map((option, i) => (
            <RNPicker.Item key={i} {...option} />
          ))}
        </BasePicker>
      </Box.View>
    </TouchableWithoutFeedback>
  )
}

export default React.forwardRef(Picker)
