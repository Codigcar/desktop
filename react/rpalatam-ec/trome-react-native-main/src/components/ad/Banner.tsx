import React, { useCallback, useState } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { Banner as AdBanner, BannerProps } from 'react-native-ad-manager'
import NativeConfig from 'react-native-config'

type Props = BannerProps & {
  adLoadedStyle?: StyleProp<ViewStyle>
}

const Ad: React.FC<Props> = React.memo((props) => {
  const enableTestAd = __DEV__ || NativeConfig.APP_ENVIRONMENT !== 'production'

  return (
    <AdBanner
      {...props}
      adUnitID={enableTestAd ? '/6499/example/banner' : props.adUnitID}
    />
  )
})

const Banner: React.FC<Props> = ({
  adLoadedStyle,
  onAdLoaded: onAdLoadedProp,
  style: styleProp,
  ...props
}) => {
  const [style, setStyle] = useState<StyleProp<ViewStyle>>()

  const onAdLoaded = useCallback(
    (ad) => {
      onAdLoadedProp?.(ad)
      if (adLoadedStyle) setStyle(adLoadedStyle)
    },
    [adLoadedStyle, onAdLoadedProp],
  )

  return (
    <View style={[styleProp, style]}>
      <Ad onAdLoaded={onAdLoaded} {...props} />
    </View>
  )
}

export default React.memo(Banner)
