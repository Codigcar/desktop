import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useCallback, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import DatePickerLabel from './Label'
import type { DatePickerProps } from './DatePicker'

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
  const [show, setShow] = useState(false)

  const handleChangeDate = useCallback(
    (_, selectedDate?: Date) => {
      setShow(false)
      if (selectedDate) onChangeDate?.(selectedDate)
    },
    [onChangeDate],
  )

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShow(true)
      }}
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
      {show ? (
        <DateTimePicker
          value={value || today}
          onChange={handleChangeDate}
          {...rest}
        />
      ) : null}
    </TouchableWithoutFeedback>
  )
}

export default DatePicker
