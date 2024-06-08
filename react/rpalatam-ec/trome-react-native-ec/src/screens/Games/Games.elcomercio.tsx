import { DrawerActions, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { WebView } from 'react-native-webview'
import { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes'

import IconMenu from '../../assets/icons/elcomercio/menu.svg'
import Box from '../../components/box'
import Ribbon from '../../components/ribbon'
import { openInBrowser } from '../../utils/inappbrowser'
import type { HomeStackScreenProps } from '../../routes/types'

const { View } = Box
const styleWebView = { flex: 1 }
const styleTitle = { paddingLeft: 38, fontSize: 18 }
const GAMES_URL = 'https://comercio.qualitygames.media'

const GamesScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const navigation =
    useNavigation<HomeStackScreenProps<'Games'>['navigation']>()

  return (
    <View bg="background.2" flex={1}>
      <Ribbon
        loading={isLoading}
        title="Juegos"
        titleStyle={styleTitle}
        LeftComponent={() => {
          return (
            <View alignItems="center" flexDirection="row">
              <TouchableWithoutFeedback
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
                testID="menu-button">
                <View ml="0.5" width={16} height={16}>
                  <IconMenu fill="#4D4D4D" />
                </View>
              </TouchableWithoutFeedback>
            </View>
          )
        }}
      />
      <WebView
        onLoad={() => setIsLoading(false)}
        source={{ uri: GAMES_URL }}
        style={styleWebView}
        onShouldStartLoadWithRequest={(req: ShouldStartLoadRequest) => {
          const isInternalLink = req.url.startsWith(GAMES_URL)
          if (!isInternalLink) openInBrowser(req.url)
          return isInternalLink
        }}
        testID="games-screen"
      />
    </View>
  )
}
export default GamesScreen
