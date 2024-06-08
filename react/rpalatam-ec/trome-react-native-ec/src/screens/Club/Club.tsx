import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useRef, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'

import IconMenu from '../../assets/icons/elcomercio/menu.svg'
import Box from '../../components/box'
import Ribbon from '../../components/ribbon'
import { openInBrowser } from '../../utils/inappbrowser'
import type { HomeStackScreenProps } from '../../routes/types'

const { View } = Box

const CLUB_ORIGIN = 'https://clubelcomercio.pe'

const blocked = new RegExp('^' + CLUB_ORIGIN + '/(informacion|beneficiario)/?')

const Club: React.FC = () => {
  const navigation = useNavigation<HomeStackScreenProps<'Club'>['navigation']>()

  const ref = useRef<WebView>(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <View bg="background.2" flex={1}>
      <Ribbon
        title="Club"
        loading={isLoading}
        titleStyle={styles.title}
        LeftComponent={() => (
          <View alignItems="center" flexDirection="row" ml="0.5">
            <TouchableOpacity
              accessibilityLabel="Menu"
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              hitSlop={{ top: 4, left: 4, right: 4, bottom: 4 }}>
              <View
                alignItems="center"
                height={16}
                justifyContent="center"
                width={16}>
                <IconMenu fill="#4D4D4D" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <WebView
        decelerationRate="normal"
        onLoadEnd={() => setIsLoading(false)}
        onLoadStart={() => setIsLoading(true)}
        onNavigationStateChange={({ url }) => {
          const internal = url.startsWith(CLUB_ORIGIN) && !blocked.test(url)
          if (internal) return
          ref.current?.stopLoading()
          openInBrowser(url)
          setIsLoading(false)
        }}
        originWhitelist={['https://', 'whatsapp://']}
        ref={ref}
        source={{ uri: CLUB_ORIGIN }}
        testID="club-webview"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: { paddingLeft: 36 },
})

export default Club
