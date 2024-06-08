import { useTheme } from '@shopify/restyle'
import React, { useState } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import Box from '../../components/box'
import Typography from '../../components/typography'
import { Theme } from '../../theme'

type CaptionProps = {
  maxLength: number
  content?: string
}

const Container = Platform.OS === 'ios' ? Box.SafeAreaView : Box.View
const { Paragraph } = Typography

const GalleryCaption: React.FC<CaptionProps> = (props) => {
  const { maxLength, content = '' } = props
  const [isExpanded, setIsExpanded] = useState(false)
  const window = useWindowDimensions()
  const { colors } = useTheme<Theme>()
  const bgTransparent = { backgroundColor: `${colors.black}b3` }

  const hasLongContent = content.length > maxLength
  const previewContent =
    isExpanded || !hasLongContent ? content : content.substr(0, maxLength)

  const handlePressExpanded = () => {
    hasLongContent && setIsExpanded(!isExpanded)
  }

  const expandedStyles = {
    height: window.height,
  }

  return (
    <Container flex={1} style={bgTransparent}>
      <TouchableWithoutFeedback onPress={handlePressExpanded}>
        <Box.View
          p="0.75"
          justifyContent="flex-end"
          style={[isExpanded && expandedStyles]}>
          <Paragraph color="white" fontSize="xs">
            {previewContent}
          </Paragraph>
          {!isExpanded && hasLongContent ? (
            <Paragraph color="white" fontSize="xs" fontWeight="semibold">
              {'Leer más...'}
            </Paragraph>
          ) : null}
        </Box.View>
      </TouchableWithoutFeedback>
    </Container>
  )
}

export default React.memo(GalleryCaption)
