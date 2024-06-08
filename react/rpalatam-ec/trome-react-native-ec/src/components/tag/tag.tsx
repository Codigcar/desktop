import React from 'react'

import Box from '../box'
import Typography from '../typography'
import type { BoxProps } from '../../theme'

const { View } = Box
const { Paragraph } = Typography

const Tag: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <View alignItems="center" flexDirection="row">
      <View
        bg="danger"
        borderRadius="sm"
        mx="0.25"
        px="0.5"
        py="0.25"
        {...rest}>
        <Paragraph color="white" fontSize="xs" fontWeight="bold">
          {children}
        </Paragraph>
      </View>
    </View>
  )
}

export default Tag
