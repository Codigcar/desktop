import { Picker as RNPicker } from '@react-native-picker/picker'
import { useTheme } from '@shopify/restyle'
import React, { useCallback, useState } from 'react'
import { Modal, StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import BasePicker from './Base'
import Label from './Label'
import { Theme } from '../../theme'
import Box from '../box'
import Typography from '../typography'
import type { PickerProps, PickerRef } from './Picker'

const bgModal: StyleProp<ViewStyle> = {
  flex: 1,
}

const Picker: React.ForwardRefRenderFunction<PickerRef, PickerProps> = (
  {
    children,
    disabled,
    labelContainerStyle,
    options,
    onValueChange,
    placeholder,
    selectedValue,
    ...rest
  },
  forwardedRef,
) => {
  const { colors } = useTheme<Theme>()
  const [showPicker, setShowPicker] = useState(false)

  const tooglePicker = useCallback(() => {
    setShowPicker((prevValue) => !prevValue)
  }, [])

  const onDonePress = useCallback(() => {
    const ref = forwardedRef as React.RefObject<PickerRef>
    const value = ref.current?.props?.selectedValue
    const index = Math.max(
      options.findIndex((option) => option.value === value),
      0,
    )
    setShowPicker(false)
    onValueChange?.(options[index]?.value, index)
  }, [forwardedRef, options, onValueChange])

  return (
    <Box.View>
      <TouchableWithoutFeedback
        testID="open-button"
        disabled={disabled}
        onPress={tooglePicker}>
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
      </TouchableWithoutFeedback>
      <Modal visible={showPicker} transparent animationType="slide">
        <Box.View
          flex={1}
          testID="modal-container"
          accessibilityElementsHidden={!showPicker}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={tooglePicker}
            style={bgModal}
          />
          <Box.View
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
            bg="coolGray-100"
            px="1"
            height={45}>
            <TouchableOpacity
              testID="done-button"
              onPress={onDonePress}
              hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
              <Typography.Paragraph
                color="link"
                fontWeight="bold"
                allowFontScaling={false}>
                Seleccionar
              </Typography.Paragraph>
            </TouchableOpacity>
          </Box.View>
          <Box.View bg="background" height={215}>
            <BasePicker
              ref={forwardedRef}
              selectedValue={selectedValue}
              accessibilityState={{ disabled }}
              {...rest}>
              {options.map((option, i) => (
                <RNPicker.Item
                  key={i}
                  color={colors['coolGray-800']}
                  {...option}
                />
              ))}
            </BasePicker>
          </Box.View>
        </Box.View>
      </Modal>
    </Box.View>
  )
}

export default React.forwardRef(Picker)
