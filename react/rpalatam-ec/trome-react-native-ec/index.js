import React from 'react'
import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'
import { initBackgroundMessageHandler } from './src/utils/firebase'

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null
  }
  return <App />
}

initBackgroundMessageHandler()

AppRegistry.registerComponent(appName, () => HeadlessCheck)
