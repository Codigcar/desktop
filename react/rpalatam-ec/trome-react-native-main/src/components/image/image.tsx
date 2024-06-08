import React, { useCallback, useState } from 'react'
import { StyleProp } from 'react-native'
import FastImage, {
  FastImageProps,
  ImageStyle,
  OnLoadEvent,
} from 'react-native-fast-image'

import Box from '../box'
import Placeholder from '../placeholder'

export type ImageProps = FastImageProps & {
  placeholderEnabled?: boolean
}

const Image: React.FC<ImageProps> = (props) => {
  const { onLoad, placeholderEnabled = true, style, ...rest } = props
  const [isLoaded, setIsLoaded] = useState(false)

  const styles: StyleProp<ImageStyle> = [{ flexGrow: 1 }, style]

  const onLoadImage = useCallback(
    (event: OnLoadEvent) => {
      setIsLoaded(true)
      onLoad?.(event)
    },
    [onLoad],
  )

  return (
    <Box.View flexGrow={1}>
      <FastImage onLoad={onLoadImage} style={styles} {...rest} />
      {!isLoaded && placeholderEnabled ? (
        <Box.View
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          testID="image-placeholder">
          <Placeholder />
        </Box.View>
      ) : null}
    </Box.View>
  )
}

export default Image
