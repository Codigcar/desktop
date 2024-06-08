import React, { useCallback, useState } from 'react'

import { RadioGroupContext } from './RadioGroupContext'
import Box from '../box'
import type { RadioGroupProps } from './types'

const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  defaultValue,
  name,
  onChangeValue,
}) => {
  const [value, setValue] = useState(defaultValue)

  const onPress = useCallback(
    (radioValue: string) => {
      onChangeValue?.(radioValue)

      setValue(radioValue)
    },
    [onChangeValue],
  )

  return (
    <RadioGroupContext.Provider value={{ onPress, value }}>
      <Box.View accessibilityRole="radiogroup" testID={name}>
        {children}
      </Box.View>
    </RadioGroupContext.Provider>
  )
}

export default RadioGroup
