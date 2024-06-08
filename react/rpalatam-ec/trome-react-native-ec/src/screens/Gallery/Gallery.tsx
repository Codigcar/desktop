import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Animated,
  Platform,
  StatusBar,
  useWindowDimensions,
} from 'react-native'
import { Interstitial } from 'react-native-ad-manager'
import NativeConfig from 'react-native-config'
import ImageViewer from 'react-native-image-zoom-viewer'
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type'
import Orientation from 'react-native-orientation-locker'

import GalleryCaption from './GalleryCaption'
import GalleryHeader from './GalleryHeader'
import * as styles from './styles'
import Box from '../../components/box'
import Placeholder from '../../components/placeholder'
import { useAuth } from '../../context/auth'
import { App } from '../../utils/config'
import type { RootStackScreenProps } from '../../routes/types'

type Props = {
  navigation: RootStackScreenProps<'Gallery'>['navigation']
  route: RootStackScreenProps<'Gallery'>['route']
}

export const refImageViewer = React.createRef<ImageViewer>()

const adUnitID = (() => {
  const section = App.select({
    depor: 'default',
    trome: 'default',
    default: 'fotogalerias',
  })
  return NativeConfig.APP_ENVIRONMENT === 'production'
    ? `/28253241/${App.key}/pwa/post/${section}/intersticial`
    : '/6499/example/interstitial'
})()

const adPositions = (qtyPhotos: number) => {
  // after how many photos does an ad show
  let interval = Math.floor(qtyPhotos / 4)
  // interval must not be greater than 8
  interval = Math.min(8, interval)
  // interval must not be less than 4
  interval = Math.max(4, interval)
  // quantity of ads
  const length = Math.floor(qtyPhotos / interval)
  // array of ad index
  const adIndex = Array.from({ length }).map((_, i) => (i + 1) * interval)
  return new Set(adIndex)
}

const GalleryScreen: React.FC<Props> = ({ navigation, route }) => {
  const {
    album,
    album: { caption = true },
  } = route.params

  const { isSubscribed } = useAuth()
  const [toggleAnimation, setToogleAnimation] = useState(true)
  const animated = useRef(new Animated.Value(1)).current
  const window = useWindowDimensions()

  const images: IImageInfo[] = useMemo(() => {
    return album.photos.map((photo) => ({
      url: photo.src,
      title: photo.description,
    }))
  }, [album.photos])

  useEffect(() => {
    if (Platform.OS === 'android') {
      Orientation.getAutoRotateState((state) => {
        state && Orientation.unlockAllOrientations()
      })
    } else if (Platform.OS === 'ios') {
      Orientation.unlockAllOrientations()
    }
    return () => {
      Orientation.lockToPortrait()
    }
  }, [])

  const fadeAnimation = useCallback(() => {
    Animated.timing(animated, {
      toValue: Number(!toggleAnimation),
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setToogleAnimation(!toggleAnimation)
    })
  }, [animated, toggleAnimation])

  const adIndex = useRef(adPositions(images.length))

  const requestInsterstitial = useCallback(async () => {
    try {
      Interstitial.setAdUnitID(adUnitID)
      await Interstitial.requestAd()
      await Interstitial.showAd()
    } catch (error) {
      crashlytics().recordError(error as Error)
    }
  }, [])

  const handleChange = useCallback(
    (index?: number) => {
      if (!isSubscribed && index && adIndex.current.has(index + 1)) {
        adIndex.current.delete(index + 1)
        requestInsterstitial()
      }
      if (index !== undefined) {
        analytics().logScreenView({
          screen_name: `screen_gallery?photo=${index + 1}`,
          screen_class: 'GalleryScreen',
        })
      }
    },
    [isSubscribed, requestInsterstitial],
  )

  return (
    <>
      <StatusBar hidden />
      <ImageViewer
        ref={refImageViewer}
        imageUrls={images}
        backgroundColor="#000"
        enablePreload={false}
        enableSwipeDown
        onSwipeDown={navigation.goBack}
        onClick={fadeAnimation}
        onChange={handleChange}
        pageAnimateTime={Platform.OS === 'ios' ? 150 : 300}
        saveToLocalByLongPress={false}
        loadingRender={() => (
          <Box.View
            alignItems="center"
            style={{ width: window.width, height: window.width * 0.5625 }}>
            <Placeholder />
          </Box.View>
        )}
        renderHeader={(index = 0) => {
          return (
            <Animated.View
              testID="header-animated-view"
              style={[
                styles.gallery.headerContainer,
                {
                  opacity: animated,
                  width: Platform.OS === 'ios' ? window.width : undefined,
                },
              ]}>
              <GalleryHeader index={index + 1} size={images.length} />
            </Animated.View>
          )
        }}
        renderFooter={(index) => {
          return caption ? (
            <Animated.View
              testID="caption-animated-view"
              style={{
                opacity: animated,
                width: Platform.OS === 'ios' ? window.width : undefined,
              }}>
              <GalleryCaption
                maxLength={240}
                content={album.photos[index]?.description || ''}
              />
            </Animated.View>
          ) : (
            <React.Fragment />
          )
        }}
        renderIndicator={() => <React.Fragment />}
      />
    </>
  )
}

export default GalleryScreen
