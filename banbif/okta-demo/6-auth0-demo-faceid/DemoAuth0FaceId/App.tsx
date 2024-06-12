/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
  Linking,
  SafeAreaView,
} from 'react-native';
import Auth0, {Auth0Provider, useAuth0} from 'react-native-auth0';
import {config} from './configauth0';
import WebView from 'react-native-webview';
import {checkMultiple, PERMISSIONS, request} from 'react-native-permissions';
import InAppBrowser from 'react-native-inappbrowser-reborn';

function extractAccessToken(url: string): string | null {
  // Intenta crear un objeto URL, lo cual también valida la URL
  try {
    // Encuentra la posición del parámetro 'access_token'
    const accessTokenParam = 'access_token=';
    const start = url.indexOf(accessTokenParam);
    if (start === -1) return null; // Si no se encuentra 'access_token', retorna nulo

    // Corta desde el inicio del valor de 'access_token'
    let fromAccessToken = url.substring(start + accessTokenParam.length);
    // Encuentra el final del token antes del siguiente '&' o al final del string
    const end = fromAccessToken.indexOf('&');
    if (end !== -1) {
      fromAccessToken = fromAccessToken.substring(0, end);
    }

    return fromAccessToken;
  } catch (error) {
    console.error('Error parsing URL:', error);
    return null;
  }
}

const AuthWebview = () => {
  // const domainApp = 'demoauth0faceid'
  const domainApp = 'demofaceid';
  const URI = `https://${config.domain}/authorize?response_type=token&client_id=${config.clientId}&redirect_uri=com.${domainApp}.auth0://${config.domain}/ios/com.${domainApp}/callback&scope=openid%20profile%20email`;

  console.log('🚀 ----------------------------------------------🚀');
  console.log('🚀 ~ file: App.tsx:42 ~ AuthWebview ~ URI:', URI);
  console.log('🚀 ----------------------------------------------🚀');

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex: 1}}>
        <WebView
          javaScriptEnabled
          thirdPartyCookiesEnabled={true}
          style={{flex: 1}}
          mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
          originWhitelist={['*']}
          allowsInlineMediaPlayback
          useWebKit
          mediaPlaybackRequiresUserAction={false}
          onMessage={(event: any) => {
            console.log(
              '🚀 --------------------------------------------------🚀',
            );
            console.log('🚀 ~ file: App.tsx:67 ~ AuthWebview ~ event:', event);
            console.log(
              '🚀 --------------------------------------------------🚀',
            );
          }}
          source={{
            // uri: 'https://webauthn.io/',
            uri: URI,
          }}
          onNavigationStateChange={(response: any) => {
            console.log(
              '🚀 --------------------------------------------------------🚀',
            );
            console.log(
              '🚀 ~ file: App.tsx:70 ~ AuthWebview ~ response:',
              JSON.stringify(response),
            );
            console.log(
              '🚀 --------------------------------------------------------🚀',
            );
            const url = response?.url;
            console.log('🚀 -----------------------------------------🚀');
            console.log('🚀 ~ file: Auth0.screen.tsx:50 ~ url:', url);
            console.log('🚀 -----------------------------------------🚀');
            const getToken = extractAccessToken(url);
            console.log(
              '🚀 ---------------------------------------------------🚀',
            );
            console.log('🚀 ~ file: Auth0.screen.tsx:54 ~ getToken:', getToken);
            console.log(
              '🚀 ---------------------------------------------------🚀',
            );
            if (!getToken) return;
            // navigation.pop();
            // navigation.push("MainMenu")
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const LogoutScreen: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        source={{
          uri: `https://${config.domain}/v2/logout?client_id=${config.clientId}&returnTo=com.demofaceid.auth0://${config.domain}/ios/com.demofaceid/callback`,
        }}
        onNavigationStateChange={data => {
          console.log('🚀 -------------------------------------------🚀');
          console.log(
            '🚀 ~ file: Auth0.screen.tsx:20 ~ data:',
            JSON.stringify(data),
          );
          console.log('🚀 -------------------------------------------🚀');
          if (
            data.url !==
            'com.banbifbancaempresasapp.auth0://dev-mgutghza.us.auth0.com/android/com.banbifbancaempresasapp/callback'
          )
            return;
          // navigation.pop()
        }}
      />
    </View>
  );
};

const auth0 = new Auth0(config);

const App = () => {
  let [accessToken, setAccessToken] = useState<string | null>(null);
  // const {  } = useAuth()

  request(PERMISSIONS.IOS.FACE_ID).then(result => {
    console.log('🚀 -------------------------------------------------🚀');
    console.log('🚀 ~ file: App.tsx:124 ~ request ~ result:', result);
    console.log('🚀 -------------------------------------------------🚀');
  });

  request(PERMISSIONS.IOS.CAMERA).then(result => {
    console.log('🚀 -------------------------------------------------🚀');
    console.log('🚀 ~ file: App.tsx:130 ~ request ~ result:', result);
    console.log('🚀 -------------------------------------------------🚀');
  });

  checkMultiple([PERMISSIONS.IOS.FACE_ID, PERMISSIONS.IOS.CAMERA]).then(
    (statuses: any) => {
      console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
      console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
    },
  );

  const onLogin = () => {
    auth0.webAuth
      .authorize()
      .then(credentials => {
        console.log(
          '🚀 ----------------------------------------------------------🚀',
        );
        console.log(
          '🚀 ~ file: App.tsx:27 ~ onLogin ~ credentials:',
          credentials,
        );
        console.log(
          '🚀 ----------------------------------------------------------🚀',
        );
        Alert.alert('AccessToken: ' + credentials.accessToken);
        setAccessToken(credentials.accessToken);
      })
      .catch(error => console.log(error));
  };

  const onLogout = () => {
    auth0.webAuth
      .clearSession({})
      .then(() => {
        Alert.alert('Logged out!');
        setAccessToken(null);
      })
      .catch(() => {
        console.log('Log out cancelled');
      });
  };

  let loggedIn = accessToken !== null;

  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const domainApp = 'demofaceid';
  const URI = `https://${config.domain}/authorize?response_type=token&client_id=${config.clientId}&redirect_uri=com.${domainApp}.auth0://${config.domain}/ios/com.${domainApp}/callback&scope=openid%20profile%20email`;

  const configInApp = {
    // iOS Properties
    dismissButtonStyle: 'cancel',
    preferredBarTintColor: '#1FA5FF',
    preferredControlTintColor: 'white',
    readerMode: false,
    animated: true,
    modalPresentationStyle: 'fullScreen',
    modalTransitionStyle: 'coverVertical',
    modalEnabled: false,
    enableBarCollapsing: false,
    // Android Properties
    showTitle: true,
    toolbarColor: '#1FA5FF',
    secondaryToolbarColor: 'black',
    navigationBarColor: 'black',
    navigationBarDividerColor: 'white',
    enableUrlBarHiding: true,
    enableDefaultShare: true,
    forceCloseOnRedirection: false,
    // Specify full animation resource identifier(package:anim/name)
    // or only resource name(in case of animation bundled with app).
    animations: {
      startEnter: 'slide_in_right',
      startExit: 'slide_out_left',
      endEnter: 'slide_in_left',
      endExit: 'slide_out_right',
    },
    headers: {
      'my-custom-header': 'my custom header value',
    },
  };

  const openIAppBrowser = () => {
    // InAppBrowser.open('https://webauthn.io/', configInApp);
    InAppBrowser.open(URI, configInApp);
  };

  useEffect(() => {
    // openIAppBrowser()
    onLogin()
  }, [])

  // return (
  //   <SafeAreaView>
  //     <View>
  //       <Text>holaaa</Text>
  //       <Button title="InApp" onPress={() => openIAppBrowser()} />
  //     </View>
  //   </SafeAreaView>
  // );
  // return <AuthWebview />;
  // return (
  //   <LogoutScreen />
  // )

  // return (
  //   <SafeAreaView style={{flex: 1}}>
  //     <View style={{backgroundColor: 'white', flex: 1}}>
  //       <Text>hpla</Text>
  //       <Button
  //         title="Login"
  //         onPress={() => {
  //           setShowLogin(true);
  //         }}
  //       />
  //       <Button
  //         title="Logout"
  //         onPress={() => {
  //           setShowLogout(true);
  //         }}
  //       />
  //       <View style={{flex: 1, backgroundColor: 'red'}}>
  //         {showLogin && <AuthWebview />}
  //       </View>
  //       <View style={{flex: 1}}>{showLogout && <LogoutScreen />}</View>
  //     </View>
  //   </SafeAreaView>
  // );

  // return (
  //   <LogoutScreen />
  // )

  return (
    <Auth0Provider domain={config.domain} clientId={config.clientId}>
      <View style={styles.container}>
        <Text style={styles.header}> Auth0Sample - Login </Text>
        <Text>You are{loggedIn ? ' ' : ' not '}logged in. </Text>
        <Button
          onPress={loggedIn ? onLogout : onLogin}
          title={loggedIn ? 'Log Out' : 'Log In'}
        />
      </View>
    </Auth0Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;

/* android */
// com.demoauth0faceid.auth0://dev-0pim7w06kf3qg36j.us.auth0.com/android/com.demoauth0faceid/callback

/* ios */
// BUNDLE_IDENTIFIER.auth0://dev-0pim7w06kf3qg36j.us.auth0.com/ios/BUNDLE_IDENTIFIER/callback
// com.demofaceid.auth0://dev-0pim7w06kf3qg36j.us.auth0.com/ios/com.demofaceid/callback

/* webview */
/* android */
// com.demofaceid.auth0://dev-0pim7w06kf3qg36j.us.auth0.com/android/com.demofaceid/callback
/* ios */
// com.demofaceid.auth0://dev-0pim7w06kf3qg36j.us.auth0.com/ios/com.demofaceid/callback
