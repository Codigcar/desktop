import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import Routes from './src/route/Routes';
import {startNetworkLogging} from 'react-native-network-logger';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
// import { initForegroundMessageHandler } from './src/utils/firebase';
import notifee, {EventType} from '@notifee/react-native';
import * as Auth0Guardian from 'react-native-auth0-guardian';
import config from './src/utils/configAuth0';
import {AuthProvider} from './src/context/auth.provider';
import NotifeeRN from './src/utils/notifee';

startNetworkLogging({forceEnable: true});
const App = () => {
  // useEffect(() => {
  //   const unsubscribe = initForegroundMessageHandler()
  //   return unsubscribe
  // }, [])

  // Subscribe to events
  useEffect(() => {
    Auth0Guardian.initialize(config.guardianServiceUrl)
      .then(result => {
        console.log('Auth0 Guardian initialized 😎');

        // Auth0Guardian.allow(response.notification.request.content.data).then((isAllowed) => {
        //   console.log({ isAllowed })
        //   // Notifications.dismissNotificationAsync(response.notification.request.identifier);
        // }).catch(error => console.log(error));
      })
      .catch(err => console.log(err));

    // notifee.onForegroundEvent((payload) => {
    //   console.log("🚀 -------------------------------------------------------------------------🚀")
    //   console.log("🚀 ~ [onForegroundEvent] file: App.js:33 ~ returnnotifee.onForegroundEvent ~ payload:", JSON.stringify(payload))
    //   console.log("🚀 -------------------------------------------------------------------------🚀")
    //   const {type, detail} = payload
    //   switch (type) {
    //     case EventType.DISMISSED:
    //       console.log('111 User dismissed notification', detail.notification);
    //       break;
    //     case EventType.PRESS:
    //       console.log('222 User pressed notification', detail.notification);
    //       break;
    //     case EventType.ACTION_PRESS:
    //       console.log('333 User pressed notification', detail.notification);
    //       break;
    //   }
    // });

    // notifee.onBackgroundEvent(async (payload) => {
    //   console.log("🚀 -------------------------------------------------------------------🚀")
    //   console.log("🚀 ~ [onBackgroundEvent] file: App.js:51 ~ notifee.onBackgroundEvent ~ payload:", JSON.stringify(payload))
    //   console.log("🚀 -------------------------------------------------------------------🚀")
    //   const { type, detail, headless } = payload
    //   const action = detail.pressAction.id
    //   if(action === "allow"){

    //   }
    //   if(action === "reject") {

    //   }
    //   if (type === EventType.DISMISSED) {
    //     // Update remote API
    //   }
    // });

    NotifeeRN.getInstance();
  }, []);

  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <AuthProvider>
        <NativeBaseProvider>
          <Routes />
        </NativeBaseProvider>
      </AuthProvider>
    </Auth0Provider>
  );
};

export default App;
