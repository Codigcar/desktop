import { Button, View, Text } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import * as Auth0Guardian from 'react-native-auth0-guardian';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MfaService from './mfa/MfaService';
import jwtDecode from 'jwt-decode';
import config from '../../../../src/utils/configAuth0';
import { useAuth } from '../../../../src/context/auth.provider';

const Guardian: React.FC = () => {
    Auth0Guardian.initialize(config.guardianServiceUrl);

    const [enrolled, setEnrolled] = useState<any>(false);
    const [otp, setOtp] = useState('-');
    // const {getCredentials} = useAuth0();
    const { user } = useAuth()
    const [accessToken, setAccessToken] = useState<any>(); 

    const setAndCleanAccessToken = (accessToken:any) => {
      let decodedToken = jwtDecode(accessToken); 
      setAccessToken(JSON.stringify(decodedToken, null, 2));
    }

    useEffect(() => {
        const fetchAccessToken = async () => {
          // let accessToken = (await getCredentials())?.accessToken;
          let accessToken = null
          if(!accessToken) return
          setAndCleanAccessToken(accessToken);
        }
        if(!accessToken) {
          fetchAccessToken();
        }
        retrieveEnrolled();
         if(enrolled) {
           setInterval(async () => setOtpHook(), 1000);
        }
    }, );

    const setOtpHook = async () => {
      const totpCode = await Auth0Guardian.getTOTP();
      setOtp(totpCode);
    }

    const getOtp = async () => {
      return await Auth0Guardian.getTOTP();
    }

    const enroll = async () => {
        const initX = await Auth0Guardian.initialize(config.guardianServiceUrl);
        console.log("🚀 --------------------------------------------------🚀")
        console.log("🚀 ~ file: Guardian.tsx:55 ~ enroll ~ initX:", initX)
        console.log("🚀 --------------------------------------------------🚀")
        const deviceToken = await messaging().getToken();
        console.log("🚀 --------------------------------------------------------------🚀")
        console.log("🚀 ~ file: Guardian.tsx:57 ~ enroll ~ deviceToken:", deviceToken)
        console.log("🚀 --------------------------------------------------------------🚀")

        const json = await MfaService.associate(user?.mfa_token);
        console.log("🚀 ------------------------------------------------🚀")
        console.log("🚀 ~ file: Guardian.tsx:67 ~ enroll ~ json:", json)
        console.log("🚀 ------------------------------------------------🚀")

        try {
                const isEnrolled = await Auth0Guardian.enroll(json.barcode_uri, deviceToken);
                console.log("🚀 ------------------------------------------------------------🚀")
                console.log("🚀 ~ file: Guardian.tsx:72 ~ enroll ~ isEnrolled:", isEnrolled)
                console.log("🚀 ------------------------------------------------------------🚀")
                console.log('Enrolled:' + isEnrolled)
                saveEnrolled();
                setEnrolled(true);
            } catch (err)  {
                console.log("🚀 ----------------------------------------------🚀")
                console.log("🚀 ~ file: Guardian.tsx:84 ~ enroll ~ err:", JSON.stringify(err))
                console.log("🚀 ----------------------------------------------🚀")
            }
    };

    const unenroll = async () => {
        try {
            await Auth0Guardian.initialize(config.guardianServiceUrl);
            const isUnenrolled = await Auth0Guardian.unenroll();
            console.log('Unenrolled:' + isUnenrolled)
            removeEnrolled();
            setEnrolled(false);
        } catch (err) {
            console.log(err)
        }
    }

    const triggerMfa = async () => {
      // Obtener Token
      // - access_token
      // - id_token

      let res = await MfaService.completeChallengeWithOtp(await getOtp(),user?.mfa_token);
      console.log("🚀 ---------------------------------------------------🚀")
      console.log("🚀 ~ file: Guardian.tsx:107 ~ triggerMfa ~ res:", res)
      console.log("🚀 ---------------------------------------------------🚀")
    }

    const saveEnrolled = async () => {
        try {
          await AsyncStorage.setItem(
            'guardian',
            JSON.stringify(true),
          );
        } catch (error) {
            console.log(error);
        }
      };

    const removeEnrolled = async () => {
      try {
        await AsyncStorage.removeItem('guardian');
      } catch (error) {
          console.log(error);
      }
    };

    const retrieveEnrolled = async () => {
      try {
        let value = await AsyncStorage.getItem('guardian');
        if (value !== null) {
          value = JSON.parse(value);
          setEnrolled(value!);
        }
      } catch (error) {
          console.log(error);
      }
    };

    return (
        <View>
            <Text>{JSON.stringify(accessToken)}</Text>
            {!enrolled && <Button onPress={enroll} title="Enroll Device for Guardian Push" />}
            {enrolled && <Button onPress={triggerMfa} title="Trigger MFA Exchange" />}
            {enrolled && <Button onPress={unenroll} title="Unenroll Device from Guardian Push" />}
            {enrolled && <Text style={{fontSize: 20, textAlign: 'center'}} >Current OTP: {otp}</Text>}
        </View>
        
    )
}

export default Guardian