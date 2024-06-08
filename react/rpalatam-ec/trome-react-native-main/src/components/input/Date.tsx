import { useField } from '@unform/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import DatePicker, { DatePickerProps } from '../datePicker'

type Props = Omit<DatePickerProps, 'value'> & {
  name: string
  defaultDate?: Date
}

const DateInput: React.FC<Props> = ({
  name,
  defaultDate,
  onChangeDate,
  ...rest
}) => {
  const { fieldName, registerField } = useField(name)
  const defaultValue = useRef(defaultDate)
  const inputRef = useRef<Date>()
  const [currentDate, setCurrentDate] = useState(defaultDate)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        return inputRef.current
      },
      setValue(_, nextValue) {
        setCurrentDate(nextValue as Date)
      },
      clearValue() {
        setCurrentDate(defaultValue.current)
      },
    })
  }, [fieldName, registerField])

  useEffect(() => {
    inputRef.current = currentDate
  }, [currentDate])

  const handleChangeDate = useCallback(
    (date: Date) => {
      setCurrentDate(date)
      onChangeDate?.(date)
    },
    [onChangeDate],
  )

  return (
    <DatePicker value={currentDate} onChangeDate={handleChangeDate} {...rest} />
  )
}

export default DateInput
