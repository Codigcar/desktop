import { useTheme } from '@shopify/restyle'
import React from 'react'
import { Platform, TouchableWithoutFeedback } from 'react-native'
import { SvgProps } from 'react-native-svg'

import IconApple from '../../../assets/icons/apple.svg'
import IconFacebook from '../../../assets/icons/facebook.svg'
import IconGoogle from '../../../assets/icons/google.svg'
import Box from '../../../components/box'
import Typography from '../../../components/typography'
import type { SocialMediaProvider } from '../../../hooks/useAuthWithSocialMedia'
import type { Theme } from '../../../theme'

const { View } = Box
const { Paragraph } = Typography

type Provider = {
  icon: React.FC<SvgProps>
  id: SocialMediaProvider
  label: string
}

const PROVIDERS: Provider[] = Platform.select({
  ios: [
    { icon: IconGoogle, id: 'google', label: 'Google' },
    { icon: IconFacebook, id: 'facebook', label: 'Facebook' },
    { icon: IconApple, id: 'apple', label: 'Apple' },
  ],
  default: [
    { icon: IconGoogle, id: 'google', label: 'Google' },
    { icon: IconFacebook, id: 'facebook', label: 'Facebook' },
  ],
})

type Props = {
  isSubmitted: boolean
  signInSocialMedia: (provider: SocialMediaProvider) => void
  title?: string
}

const SocialMedia: React.FC<Props> = ({
  signInSocialMedia,
  isSubmitted,
  title,
}) => {
  const { colors } = useTheme<Theme>()

  return (
    <View>
      <View pt="2" pb="1.5">
        <Paragraph
          textAlign="center"
          color="text.5"
          fontSize="lg"
          fontWeight="bold">
          {title || 'O entra con'}
        </Paragraph>
      </View>
      <View
        pb="1.5"
        flexDirection="row"
        justifyContent="center"
        alignItems="center">
        {PROVIDERS.map((item) => {
          const Icon = item.icon
          return (
            <View key={item.id} alignItems="center" width={96}>
              <TouchableWithoutFeedback
                disabled={isSubmitted}
                onPress={() => signInSocialMedia(item.id)}>
                <View alignItems="center">
                  <View
                    alignItems="center"
                    bg="text.5"
                    borderRadius="full"
                    justifyContent="center"
                    mb="0.5"
                    height={48}
                    width={48}>
                    <Icon fill={colors['text.6']} />
                  </View>
                  <Paragraph color="text.4" fontSize="sm">
                    {item.label}
                  </Paragraph>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )
        })}
      </View>
    </View>
  )
}

export default SocialMedia
