import { Picker as RNPicker } from '@react-native-picker/picker'
import React, { useCallback, useState } from 'react'

import type { PickerBaseProps, PickerRef } from './Picker'

const PickerBase: React.ForwardRefRenderFunction<PickerRef, PickerBaseProps> = (
  { onValueChange, selectedValue, ...rest },
  forwardedRef,
) => {
  const [currentValue, setCurrentValue] = useState(selectedValue)

  const handleValueChange = useCallback(
    (value: string, index: number) => {
      onValueChange?.(value, index)
      setCurrentValue(value)
    },
    [onValueChange],
  )

  return (
    <RNPicker
      ref={forwardedRef}
      onValueChange={handleValueChange}
      selectedValue={currentValue}
      {...rest}
    />
  )
}

export default React.forwardRef(PickerBase)
