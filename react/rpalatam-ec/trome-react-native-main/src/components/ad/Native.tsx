import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import {
  NativeAdProps,
  NativeAdsManager,
  TriggerableView,
  withNativeAd,
} from 'react-native-ad-manager'
import NativeConfig from 'react-native-config'

import Box from '../box'
import Image from '../image'
import Typography from '../typography'

const { View } = Box
const { Paragraph, Title } = Typography

type Props = {
  nativeAd?: {
    type: string
    bodyText?: string
    callToActionText?: string
    icon?: { uri: string }
    images?: { uri: string }[]
    headline?: string
  }
}

export const NativeAdContent: React.FC<Props> = ({ nativeAd }) => {
  if (!nativeAd) return null
  if (!['native'].includes(nativeAd.type)) return null

  const { bodyText, images, headline } = nativeAd

  return (
    <View testID="adNative" flexDirection="column" py="1">
      <View flexDirection="row">
        <TriggerableView style={styles.triggerableView} />
        <View flex={1}>
          <View flexDirection="row">
            <View flex={1}>
              {headline ? (
                <Title fontSize="base" lineHeight="snug" color="coolGray-700">
                  {headline}
                </Title>
              ) : null}
            </View>
            {images?.[0] ? (
              <View pl="0.5">
                <View
                  aspectRatio={4 / 3}
                  borderRadius="sm"
                  overflow="hidden"
                  position="relative"
                  width={120}>
                  <Image source={{ uri: images[0].uri }} resizeMode="cover" />
                </View>
              </View>
            ) : null}
          </View>
          {bodyText ? (
            <View pt="0.5">
              <Paragraph color="coolGray-700">{bodyText}</Paragraph>
            </View>
          ) : null}
          <View pt="0.5">
            <Paragraph fontSize="sm" color="text">
              Ad
            </Paragraph>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  triggerableView: {
    backgroundColor: '#000000',
    position: 'absolute',
    opacity: 0,
    height: '100%',
    width: '100%',
    zIndex: 9999,
  },
})

type NativeAdViewProps = Omit<NativeAdProps, 'adUnitID' | 'testDevices'> & {
  adsManager: NativeAdsManager
  validAdTypes: string[]
}

const NativeAdView: React.FC<NativeAdViewProps> = withNativeAd(NativeAdContent)

const NativeAd: React.FC<NativeAdProps> = ({
  adUnitID,
  testDevices = [],
  ...rest
}) => {
  const enableTestAd = __DEV__ || NativeConfig.APP_ENVIRONMENT !== 'production'
  const adsManager = useRef(
    new NativeAdsManager(
      enableTestAd ? '/6499/example/native' : adUnitID,
      testDevices,
    ),
  )
  return (
    <NativeAdView
      adsManager={adsManager.current}
      validAdTypes={['native']}
      {...rest}
    />
  )
}

export default NativeAd
