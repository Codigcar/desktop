import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Button as ButtonRN} from 'react-native';

import useLoginInteractor from './Login.interactor';
import colors from '../../../../src/assets/colors';
import Button from '../../../../src/components/Button';
import {useNavigation} from '@react-navigation/core';
import notifee from '@notifee/react-native';
import { useAuth } from '../../../../src/context/auth.provider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = () => {
  const {loginAPI } = useLoginInteractor();
  const navigation: any = useNavigation();
  const { user } = useAuth()
  const [isEnrolled, setIsEnrolled] = useState(false)


  async function onDisplayNotification() {
    console.log('onDisplayNotification1');
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    console.log('onDisplayNotification2');

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    console.log('onDisplayNotification3');

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
    });
    console.log('onDisplayNotification4');
  }

  const init = async () => {
    const getIsEnrolled = await AsyncStorage.getItem('guardian')
    setIsEnrolled(Boolean(getIsEnrolled))
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Button
        color={colors.lightBlue}
        width={150}
        height={40}
        textButton="1 login API"
        action={async () => {
          loginAPI();
        }}
      />
      
      <View style={{backgroundColor: 'red'}}>
        {(user?.mfa_token || isEnrolled) && (
          <View>
            <Text>Welcome {user?.name}</Text>
            <ButtonRN
              onPress={() => {
                navigation.navigate('SettingScreen');
              }}
              title="MFA"
            />
          </View>
        )}
      </View>
    </View>
  );
};

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
});

export default LoginScreen;
