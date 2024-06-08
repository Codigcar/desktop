import React from 'react'

import { ItemProps } from './types'
import Box from '../box'
import Typography from '../typography'

const { View } = Box
const { Paragraph } = Typography

const Item: React.FC<ItemProps> = ({ children, error, label }) => {
  return (
    <View minHeight={96}>
      {!label ? null : (
        <Paragraph color="coolGray-500" fontWeight="bold">
          {label}
        </Paragraph>
      )}
      {children}
      {!error ? null : (
        <Paragraph color="danger" fontSize="sm" fontWeight="medium">
          {error}
        </Paragraph>
      )}
    </View>
  )
}

export default Item
