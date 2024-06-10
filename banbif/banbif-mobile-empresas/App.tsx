import React, { useEffect } from 'react'
import { NativeBaseProvider } from 'native-base'
import { startNetworkLogging } from 'react-native-network-logger'
import { Auth0Provider } from 'react-native-auth0'
import * as Auth0Guardian from 'react-native-auth0-guardian'

import config from './src/utils/configAuth0'
import { AuthProvider } from './src/context/auth.provider'
import NotifeeRN from './src/utils/notifee'
import { ThemeProvider } from './src2/theme/theme.provider'
import Routes from './src/route/Routes'
import { LogBox } from 'react-native'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

startNetworkLogging({ forceEnable: true })

const App = () => {
  useEffect(() => {
    Auth0Guardian.initialize(config.guardianServiceUrl)
      .then((result) => {
        console.log('Auth0 Guardian initialized 😎')
      })
      .catch((err) => console.log(err))

    NotifeeRN.getInstance()
  }, [])

  return (
    <ThemeProvider>
      <Auth0Provider domain={config.domain} clientId={config.clientId}>
        <AuthProvider>
          <NativeBaseProvider>
            <Routes />
          </NativeBaseProvider>
        </AuthProvider>
      </Auth0Provider>
    </ThemeProvider>
  )
}

export default App
