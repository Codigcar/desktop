import { useTheme } from '@shopify/restyle'
import { useField } from '@unform/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Theme } from '../../theme'
import Picker, { PickerProps, PickerRef } from '../picker'

type SelectProps = PickerProps & {
  name: string
  defaultValue?: string
}

const SelectInput: React.FC<SelectProps> = ({
  name,
  options,
  defaultValue,
  selectedValue = defaultValue,
  onValueChange,
  ...rest
}) => {
  const { colors } = useTheme<Theme>()
  const { registerField, fieldName, error } = useField(name)
  const pickerRef = useRef<PickerRef>(null)
  const valueRef = useRef({ default: defaultValue, current: selectedValue })
  const [value, setValue] = useState(valueRef.current.current)

  const errorStyle = {
    borderColor: error ? colors.danger : colors['coolGray-300'],
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      getValue() {
        return valueRef.current.current
      },
      clearValue() {
        setValue(valueRef.current.default)
      },
    })
  }, [registerField, fieldName])

  useEffect(() => {
    valueRef.current.current = value
  }, [value])

  const handleValueChange = useCallback(
    (nextValue: string, index: number) => {
      setValue(nextValue)
      onValueChange?.(nextValue, index)
    },
    [onValueChange],
  )

  return (
    <Picker
      ref={pickerRef}
      selectedValue={value}
      onValueChange={handleValueChange}
      options={options}
      labelContainerStyle={errorStyle}
      {...rest}
    />
  )
}

export default SelectInput
