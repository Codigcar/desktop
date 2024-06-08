import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'

import { styles } from './styles'
import Box from '../box'
import Typography from '../typography'
import type { Props } from './types'

const { Paragraph } = Typography

const Button: React.FC<Props> = ({
  title,
  disabled,
  icon,
  type = 'default',
  size = 'default',
  ...rest
}) => {
  const buttonStyles = Object.assign(
    {},
    styles.button.type[type],
    styles.button.size[size],
  )
  const iconStyles = [{ fontSize: 24, marginRight: 6, ...icon?.props.style }]
  const textStyles = Object.assign(
    {},
    styles.text.type[type],
    styles.text.size[size],
  )

  return (
    <TouchableWithoutFeedback disabled={disabled} {...rest}>
      <Box.View
        alignItems="center"
        borderRadius="sm"
        flexDirection="row"
        flexWrap="nowrap"
        justifyContent="center"
        opacity={disabled ? 0.7 : 1}
        width="100%"
        {...buttonStyles}>
        {icon ? React.cloneElement(icon, { style: iconStyles }) : null}
        <Paragraph fontWeight="bold" {...textStyles}>
          {title}
        </Paragraph>
      </Box.View>
    </TouchableWithoutFeedback>
  )
}

export default Button
