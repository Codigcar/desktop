/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { initFCM, onAppBootstrap } from './src/utils/firebase';
// import { initBackgroundMessageHandler } from './src/utils/firebase';

// initBackgroundMessageHandler()

onAppBootstrap()
initFCM()

AppRegistry.registerComponent(appName, () => App);
