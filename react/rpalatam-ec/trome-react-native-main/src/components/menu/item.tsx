import { useTheme } from '@shopify/restyle'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Theme } from '../../theme'
import Box from '../box'
import { ViewProps } from '../box/types'

type Props = ViewProps & {
  prefix?: React.ReactNode
  suffix?: React.ReactNode | 'chevron'
  spacedItem?: boolean
}

const Item: React.FC<Props> = (props) => {
  const { children, prefix, suffix, spacedItem, ...rest } = props
  const { colors } = useTheme<Theme>()

  return (
    <Box.View
      {...rest}
      flexDirection="row"
      alignItems="center"
      mt={spacedItem ? '1' : '0'}>
      {prefix ? <Box.View mr="1">{prefix}</Box.View> : null}
      <Box.View flex={1}>{children}</Box.View>
      {suffix ? (
        suffix === 'chevron' ? (
          <Icon name="chevron-right" size={22} color={colors.text} />
        ) : (
          suffix
        )
      ) : null}
    </Box.View>
  )
}

export default Item
