import {View} from 'react-native';
import WebView from 'react-native-webview';

const RegisterScreen: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        style={{flex: 1}}
        source={{
          uri: 'https://dev-mgutghza.us.auth0.com/authorize?response_type=token&client_id=Wd7uSG371ErhzIqNf5HOhWCI8tuhkrUg&redirect_uri=com.banbifbancaempresasapp.auth0://dev-mgutghza.us.auth0.com/android/com.banbifbancaempresasapp/callback&scope=openid%20profile%20email&screen_hint=signup',
        }}
      />
    </View>
  );
};
export default RegisterScreen;
