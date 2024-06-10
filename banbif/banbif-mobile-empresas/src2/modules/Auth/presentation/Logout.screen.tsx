import { useNavigation } from '@react-navigation/core';
import {View} from 'react-native';
import WebView from 'react-native-webview';
import config from '../../../../src/utils/configAuth0';

const LogoutScreen: React.FC = () => {
    const navigation: any = useNavigation()
  return (
    <View style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        source={{
          uri: `https://${config.domain}/v2/logout?client_id=${config.clientId}&returnTo=com.banbifbancaempresasapp.auth0://${config.domain}/android/com.banbifbancaempresasapp/callback`,
        }}
        onNavigationStateChange={data => {
          console.log('🚀 -------------------------------------------🚀');
          console.log(
            '🚀 ~ file: Auth0.screen.tsx:20 ~ data:',
            JSON.stringify(data),
          );
          console.log('🚀 -------------------------------------------🚀');
          if(data.url !== `com.banbifbancaempresasapp.auth0://${config.domain}/android/com.banbifbancaempresasapp/callback`) return
          // navigation.pop()
          navigation.push('LoginScreen')
        }}
      />
    </View>
  );
};

export default LogoutScreen;
