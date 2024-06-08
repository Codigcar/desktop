import { useTheme } from '@shopify/restyle'
import React from 'react'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Theme } from '../../theme'
import Box from '../box'
import SvgIcon from '../svgIcon'
import Typography from '../typography'

type BadgeProps = {
  brand: string
  showOnlyIcon?: boolean
}

const PremiumBadge: React.FC<BadgeProps> = (props) => {
  const { brand, showOnlyIcon = false } = props
  const { colors } = useTheme<Theme>()

  if (brand === 'elcomercio') {
    return (
      <Box.View
        bg="brand"
        flexDirection="row"
        alignItems="center"
        alignSelf="flex-start"
        borderRadius="sm"
        px="0.5"
        height={24}>
        <Box.View mr="0.25">
          <Icon name="lock" size={14} color="#080808" />
        </Box.View>
        <Typography.Paragraph
          color="black"
          fontSize="xxs"
          fontWeight="bold"
          lineHeight={Platform.OS === 'ios' ? 'none' : '3'}>
          SUSCRIPTOR DIGITAL
        </Typography.Paragraph>
      </Box.View>
    )
  } else if (brand === 'gestion') {
    return (
      <Box.View ml="0.25" flexDirection="row" alignItems="center">
        {showOnlyIcon ? null : (
          <Typography.Title fontSize="sm" color="badgeFont">
            ∙
          </Typography.Title>
        )}
        <Box.View mx="0.25">
          <Typography.Title fontSize="sm" color="badgeFont">
            Plus
          </Typography.Title>
        </Box.View>
        <SvgIcon type="plusg" color={colors.badgeFont} />
      </Box.View>
    )
  }

  return null
}

export default PremiumBadge
