import React, { RefAttributes } from 'react'

import Radio from './Radio'
import RadioGroup from './RadioGroup'
import type { RadioGroupProps, RadioGroupRef, RadioProps } from './types'

interface SubComponents {
  Group: React.FC<RadioGroupProps & RefAttributes<RadioGroupRef>>
}

const RadioComponent: React.FC<RadioProps> & SubComponents = (props) => (
  <Radio {...props} />
)
RadioComponent.Group = RadioGroup

export default RadioComponent
