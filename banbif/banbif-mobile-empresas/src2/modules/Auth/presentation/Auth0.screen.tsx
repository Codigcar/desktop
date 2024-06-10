import {useNavigation} from '@react-navigation/core';
import {useEffect} from 'react';
import {Button, Linking, View} from 'react-native';
import WebView from 'react-native-webview';
import config from '../../../../src/utils/configAuth0';

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

const AuthZero: React.FC = () => {
  const navigation: any = useNavigation();

  const URI = `https://${config.domain}/authorize?response_type=token&client_id=kT4xJ6156razq3zgWMpJsgqk7D6A8vBx&redirect_uri=com.banbifbancaempresasapp.auth0://${config.domain}/android/com.banbifbancaempresasapp/callback&scope=openid%20profile%20email`;

  return (
    <View style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        source={{
          uri: URI,
        }}
        onNavigationStateChange={({url}) => {
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
          navigation.pop();
          // navigation.push("MainMenu")
        }}
      />
    </View>
  );
};

export default AuthZero;
