import DateTimePicker from '@react-native-community/datetimepicker'
import { useTheme } from '@shopify/restyle'
import React, { useCallback, useRef, useState } from 'react'
import { Modal, StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import { DatePickerProps } from './DatePicker'
import DatePickerLabel from './Label'
import { Theme } from '../../theme'
import Box from '../box'
import Typography from '../typography'

const bgModal: StyleProp<ViewStyle> = {
  flex: 1,
}

const today = new Date()
const DatePicker: React.FC<DatePickerProps> = ({
  value,
  children,
  containerStyle,
  dateFormat,
  disabled,
  onChangeDate,
  ...rest
}) => {
  const { colors } = useTheme<Theme>()
  const nextDate = useRef(value)
  const [showPicker, setShowPicker] = useState(false)

  const tooglePicker = useCallback(() => {
    setShowPicker((prevValue) => !prevValue)
  }, [])

  const handleChange = useCallback(
    (_, selectedDate?: Date) => {
      nextDate.current = selectedDate || value
    },
    [value],
  )

  const onDonePress = useCallback(() => {
    setShowPicker(false)
    onChangeDate?.(nextDate.current || today)
  }, [onChangeDate])

  return (
    <Box.View>
      <TouchableWithoutFeedback
        onPress={tooglePicker}
        disabled={disabled}
        testID="open-controller">
        {!children ? (
          <DatePickerLabel
            value={value}
            containerStyle={containerStyle}
            dateFormat={dateFormat}
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
            <DateTimePicker
              value={value || today}
              onChange={handleChange}
              display="spinner"
              textColor={colors['coolGray-800']}
              {...rest}
            />
          </Box.View>
        </Box.View>
      </Modal>
    </Box.View>
  )
}

export default DatePicker
