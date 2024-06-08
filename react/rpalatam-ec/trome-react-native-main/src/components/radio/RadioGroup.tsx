import React, { useCallback, useImperativeHandle, useState } from 'react'

import { RadioGroupContext } from './RadioGroupContext'
import Box from '../box'
import type { RadioGroupProps, RadioGroupRef } from './types'

const RadioGroup: React.ForwardRefRenderFunction<
  RadioGroupRef,
  RadioGroupProps
> = ({ children, defaultValue, name, onChangeValue }, ref) => {
  const [value, setValue] = useState(defaultValue)

  const onPress = useCallback(
    (radioValue: string) => {
      onChangeValue?.(radioValue)
      setValue(radioValue)
    },
    [onChangeValue],
  )

  useImperativeHandle(
    ref,
    () => ({
      reset: () => setValue(defaultValue),
      setValue,
      value: value,
    }),
    [defaultValue, value],
  )

  return (
    <RadioGroupContext.Provider value={{ onPress, value }}>
      <Box.View accessibilityRole="radiogroup" testID={name}>
        {children}
      </Box.View>
    </RadioGroupContext.Provider>
  )
}

export default React.forwardRef(RadioGroup)
