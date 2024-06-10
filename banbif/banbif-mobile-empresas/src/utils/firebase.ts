import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import notifee from '@notifee/react-native';
import NotifeeRN from './notifee';

export async function onAppBootstrap() {
  notifee.deleteChannel('Miscellaneous');
  notifee.deleteChannel('disabled_channel');
  notifee.deleteChannel('fcm_fallback_notification_channel');

  // Register the device with FCM
  await notifee.requestPermission();
  await messaging().registerDeviceForRemoteMessages();

  // Get the token
  const token = await messaging().getToken();
  console.log('🚀 ---------------------------------------------------------🚀');
  console.log('🚀 FCM:', token);
  console.log('🚀 ---------------------------------------------------------🚀');
}

async function onMessageReceived(remoteMessage: any) {
  // console.log("🚀 ----------------------------------------------------------------------------🚀")
  // console.log("🚀 ~ file: firebase.ts:22 ~ onMessageReceived ~ remoteMessage:", remoteMessage)
  // console.log("🚀 ----------------------------------------------------------------------------🚀")

  NotifeeRN.getInstance().displayNotification(remoteMessage?.data)

  // notifee.displayNotification({
  //   title: 'Solicitud de Login',
  //   body: 'Un nuevo usuario quiere iniciar sesión',
  //   android: {
  //     channelId: 'default',
  //     actions: [
  //       {
  //         title: 'Aceptar',
  //         pressAction: {id: 'allow', launchActivity: 'default',},
  //       },
  //       {
  //         title: 'Rechazar',
  //         pressAction: {id: 'reject', launchActivity: 'default'},
  //       },
  //       // {
  //       //   title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
  //       //   pressAction: {id: 'cry'},
  //       // },
  //     ],
  //   },
  // });
}

export function initFCM() {
  messaging().onMessage(onMessageReceived);
  messaging().setBackgroundMessageHandler(onMessageReceived);
}
