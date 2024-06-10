import React, { useEffect, useState } from 'react'
import { StyleSheet, Button as ButtonRN } from 'react-native'

import useLoginInteractor from './Login.interactor'
import colors from '../../../../src/assets/colors'
import Button from '../../../../src/components/Button'
import WebView from 'react-native-webview'
import { useNavigation } from '@react-navigation/core'
import notifee from '@notifee/react-native'
import { useAuth0 } from 'react-native-auth0'
import { useAuth } from '../../../../src/context/auth.provider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Paragraph } from '../../../components/typhografic'
import { View } from '../../../components/box'

const LoginScreen: React.FC = () => {
  const { login, logout, loginAPI, loginAPIRequestPush, loginAPIAfterPush } =
    useLoginInteractor()
  const navigation: any = useNavigation()
  // const {getCredentials, user} = useAuth0();
  const { user } = useAuth()
  const [isEnrolled, setIsEnrolled] = useState(false)

  // const loggedIn = user !== undefined && user !== null;

  async function onDisplayNotification() {
    console.log('onDisplayNotification1')
    // Request permissions (required for iOS)
    await notifee.requestPermission()
    console.log('onDisplayNotification2')

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    })

    console.log('onDisplayNotification3')

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    })
    console.log('onDisplayNotification4')
  }

  const init = async () => {
    const getIsEnrolled = await AsyncStorage.getItem('guardian')
    setIsEnrolled(Boolean(getIsEnrolled))
    login()
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <View>
      
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <Button
        color={colors.lightBlue}
        width={150}
        height={40}
        textButton="Display Notification"
        action={async () => {
          onDisplayNotification()
        }}
      />
      <Button
        color={colors.lightBlue}
        width={150}
        height={40}
        textButton="login Okta"
        action={async () => {
          login();
          // navigation.push('LoginAuth0');
        }}
      />
      <Button
        color={colors.lightBlue}
        width={150}
        height={40}
        textButton="1 login API"
        action={async () => {
          loginAPI()
        }}
      />
      <Button
        color={colors.lightBlue}
        width={150}
        height={40}
        textButton="2 Enviar Challenge"
        action={async () => {
          loginAPIRequestPush()
        }}
      />
      <Button
        color={colors.lightBlue}
        width={150}
        height={40}
        textButton="3 Login despues de aceptar PUSH"
        action={async () => {
          loginAPIAfterPush()
        }}
      />
      <Button
        color={colors.lightBlue}
        width={150}
        height={40}
        textButton="register Okta"
        action={async () => {
          // logout();
          navigation.push('RegisterAuth0')
        }}
      />
      {/* <Button
        color={colors.lightBlue}
        width={150}
        height={40}
        textButton="logout Okta"
        action={async () => {
          logout();
        }}
      /> */}
      <Button
        color={colors.lightBlue}
        width={150}
        height={40}
        textButton="login Okta webview"
        action={async () => {
          navigation.push('LoginAuth0')
        }}
      />
      <Button
        color={colors.lightBlue}
        width={150}
        height={40}
        textButton="logout Okta Webview"
        action={async () => {
          // logout();
          navigation.push('LogoutAuth0')
        }}
      />

      <View style={{ backgroundColor: 'red' }}>
        {/* {user?.mfa_token || isEnrolled && (
          <View>
            <Paragraph>Welcome {user?.name}</Paragraph>
             <ButtonRN
              onPress={() => {
                navigation.navigate('SettingScreen');
              }}
              title="MFA"
            /> 
          </View>
        )} */}
        {user?.mfa_token || isEnrolled ? (
          <View>
            <Paragraph>{user?.name}</Paragraph>
            <ButtonRN
              onPress={() => {
                navigation.navigate('SettingScreen');
              }}
              title="MFA"
            /> 
          </View>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  body: {
    flex: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})

export default LoginScreen
