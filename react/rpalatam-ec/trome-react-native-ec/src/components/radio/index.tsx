import React from 'react'

import Radio from './Radio'
import RadioGroup from './RadioGroup'
import type { RadioGroupProps, RadioProps } from './types'

interface SubComponents {
  Group: React.FC<RadioGroupProps>
}

const RadioComponent: React.FC<RadioProps> & SubComponents = (props) => (
  <Radio {...props} />
)
RadioComponent.Group = RadioGroup

export default RadioComponent
