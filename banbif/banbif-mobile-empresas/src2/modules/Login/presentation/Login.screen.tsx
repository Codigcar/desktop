import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/core'

import { View } from '../../../components/box'
import config from '../../../../src/utils/configAuth0'
import useLoginInteractor from './Login.interactor'

const URI = `https://${config.domain}/authorize?response_type=token&client_id=${config.clientId}&redirect_uri=com.banbifbancaempresasapp.auth0://${config.domain}/android/com.banbifbancaempresasapp/callback&scope=openid%20profile%20email`

const LoginScreen: React.FC = () => {
  const navigation: any = useNavigation()
  const { extractAccessToken } = useLoginInteractor()

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: URI,
        }}
        onNavigationStateChange={({ url }) => {
          const getToken = extractAccessToken(url)
          if (!getToken) return
          // navigation.pop()
          // navigation.push('MainMenu')
          navigation.push('SettingScreen')
        }}
      />
    </View>
  )
}

export default LoginScreen
