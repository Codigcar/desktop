import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@shopify/restyle'
import React from 'react'
import { Platform, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../../components/box'
import Typography from '../../components/typography'
import { Theme } from '../../theme'

type HeaderProps = {
  index: number
  size: number
}

const Container = Platform.OS === 'ios' ? Box.SafeAreaView : Box.View
const { Paragraph } = Typography
const { View } = Box

const GalleryHeader: React.FC<HeaderProps> = ({ index, size }) => {
  const navigation = useNavigation()
  const { colors } = useTheme<Theme>()
  const bgTransparent = { backgroundColor: `${colors.black}b3` }

  return (
    <Container
      p="0.75"
      flex={1}
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between">
      {size > 1 ? (
        <View px="0.5" py="0.25" borderRadius="full" style={bgTransparent}>
          <Paragraph
            color="white"
            fontWeight="medium"
            fontSize="sm">{`${index} / ${size}`}</Paragraph>
        </View>
      ) : (
        <View />
      )}
      <TouchableWithoutFeedback onPress={navigation.goBack}>
        <View p="0.25" borderRadius="full" style={bgTransparent}>
          <Icon
            name="close"
            testID="gallery-close-icon"
            size={28}
            color={colors.white}
          />
        </View>
      </TouchableWithoutFeedback>
    </Container>
  )
}

export default GalleryHeader
