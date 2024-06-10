import Auth0, {useAuth0} from 'react-native-auth0';
import config from '../../../../src/utils/configAuth0';
import {useAuth} from '../../../../src/context/auth.provider';
import axios from 'axios';
import {useRef, useState} from 'react';

const qs = require('qs');
const useLoginInteractor = () => {
  const {authorize, clearSession} = useAuth0();
  const {user, signIn} = useAuth();
  // const [codeOOB, setCodeOOB] = useState<string>('')
  const codeOOBRef = useRef();

  const login = async () => {
    try {
      // await authorize()
      await authorize({scope: 'openid email offline_access'});
      // await authorize({scope: 'openid email enroll offline_access', audience : config.mfaAudience});
    } catch (error) {
      console.log(
        '🚀 -------------------------------------------------------------🚀',
      );
      console.log(
        '🚀 ~ file: Login.interactor.ts:10 ~ loginAuth0 ~ error:',
        error,
      );
      console.log(
        '🚀 -------------------------------------------------------------🚀',
      );
    }
  };

  const loginAPI = async () => {
    let data = qs.stringify({
      grant_type: 'password',
      // client_id: config.clientId,
      // audience: config.mfaAudience,
      client_id: 'Hm8za8SubEjJCrbY8Rg5pLCrzlNCvKfW',
      audience: 'https://dev-0pim7w06kf3qg36j.us.auth0.com/mfa/',
      // client_id: 'lD6A7OzLIQAetIaLJmuZEoU20TwtNY99',
      // audience: `https://dev-ck5xygantqyh3z6t.us.auth0.com/mfa/`,
      username: 'test1@mailinator.com',
      password: 'QWEasd123!',
      scope: 'openid profile read:sample',


      // grant_type: 'password',
      // // client_id: 'kT4xJ6156razq3zgWMpJsgqk7D6A8vBx',
      // client_id: config.clientId,
      // audience: `https://${config.domain}/mfa/`,
      // // username: 'test1@bb.com',
      // // password: 'QWEasd123',
      // username: 'test1@mailinator.com',
      // password: 'QWEasd123!',
      // scope: 'openid profile read:sample',
    });

    let configAXIOS = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: 'https://dev-ck5xygantqyh3z6t.us.auth0.com/oauth/token',
      url: 'https://dev-0pim7w06kf3qg36j.us.auth0.com/oauth/token',
      // url: `https://${config.domain}/oauth/token`,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data,
    };

    axios
      .request(configAXIOS)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(
          '🚀 ------------------------------------------------------------🚀',
        );
        console.log(
          '🚀 ~ file: Login.interactor.ts:108 ~ loginAPI ~ error:',
          JSON.stringify(error?.response?.data),
        );
        console.log(
          '🚀 ------------------------------------------------------------🚀',
        );
        // user?.mfa_token = error?.response?.data.mfa_token;
        signIn({
          mfa_token: error?.response?.data.mfa_token,
          name: 'example',
        });
      });
  };



  const loginAPIRequestPush = () => {
    var options = {
      method: 'POST',
      // url: 'https://dev-ck5xygantqyh3z6t.us.auth0.com/mfa/challenge',
      url: `https://${config.domain}/mfa/challenge`,
      data: {
        client_id: config.clientId,
        client_secret: config.clientSecret,
        challenge_type: 'oob',
        authenticator_id: 'push|dev_LD4Qr06lt4PcznF0',
        mfa_token: user?.mfa_token,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(
          '🚀 ------------------------------------------------------🚀',
        );
        console.log(
          '🚀 ~ file: Login.interactor.ts:95 ~ response:',
          response.data,
        );
        console.log(
          '🚀 ------------------------------------------------------🚀',
        );
        // {"challenge_type": "oob", "oob_code": "Fe26.2*SERVER_1689846311*b8b9a07b83323fe1a0b83c36f30dea6eba9fe17269414c96bec20f7f4dc8d3f9*GCsbSZ8mVGS-1qhneGgdvg*TTV3A7b5q00I0KbzLg1AwEuWaiDjOfXBpF5gxjMFzeo6gbZa5459Ovo4E6kG8QQZYXHeAwWUdxWfwOhJLFQMzWWAzeKp90v_UTRsLgobF97JRthqj7L11WuhjX1pdk0Gxg0uYoPwqob_0YxDvmh2CoBMBSXPRCAl5BJ8gpbEUvjBYMDjJSbLVoVooyx-Rp4LxBbKuCB0G_OaufPgKsKYJaRV5MVap2V46eQ86e6hvlEWxd2fyVREOFrPZXsDBw8q9StM1SxaSlrwNwKwzb87107xbEBr9aTpKMndWc8qiFMGz9y_QtNaENZm5MI_b-qPxXQurJ_VY_mbmxMuEu48aK4n5O8vnDgj-69Iwo2Y06HtuLnlyFUT4YP7IaJo7vsLtMDDLx3ckgTfWxHsUpjORQ*1716468566596*4ec73d4ffc80fbf3759f46f05141e7e14a1d26d3a1f55db044dd2c3f8586453a*Djcj9xaCo5fF4Ke5AJM3L9TCgsZHqKUyMXcgUJHULsA"}
        codeOOBRef.current = response?.data?.oob_code;

        var options = {
          method: 'POST',
          // url: `https://dev-ck5xygantqyh3z6t.us.auth0.com/oauth/token`,
          url: `https://${config.domain}/oauth/token`,
          headers: {'content-type': 'application/x-www-form-urlencoded'},
          data: new URLSearchParams({
            grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
            client_id: config.clientId,
            client_secret: config.clientSecret,
            mfa_token: user!.mfa_token,
            oob_code: response?.data?.oob_code,
          }),
        };

        axios
          .request(options)
          .then(function (response) {
            console.log(
              '🚀 -------------------------------------------------------🚀',
            );
            console.log(
              '🚀 ~ file: Login.interactor.ts:126 ~ response:',
              response?.data,
            );
            console.log(
              '🚀 -------------------------------------------------------🚀',
            );
          })
          .catch(function (error) {
            console.log(
              '🚀 ---------------------------------------------------------------------🚀',
            );
            console.log(
              '🚀 ~ file: Login.interactor.ts:131 ~ loginAPIAfterPush ~ error:',
              error?.response.data,
            );
            console.log(
              '🚀 ---------------------------------------------------------------------🚀',
            );
          });
      })
      .catch(function (error) {
        console.log(
          '🚀 ----------------------------------------------------------------------🚀',
        );
        console.log(
          '🚀 ~ file: Login.interactor.ts:98 ~ loginAPIRequestPush ~ error:',
          JSON.stringify(error?.response?.data),
        );
        console.log(
          '🚀 ----------------------------------------------------------------------🚀',
        );
      });
  };

  const loginAPIAfterPush = () => {
    var options = {
      method: 'POST',
      // url: `https://dev-ck5xygantqyh3z6t.us.auth0.com/oauth/token`,
      url: `https://${config.domain}/oauth/token`,
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      data: new URLSearchParams({
        grant_type: 'http://auth0.com/oauth/grant-type/mfa-oob',
        client_id: config.clientId,
        client_secret: config.clientSecret,
        mfa_token: user!.mfa_token,
        oob_code: String(codeOOBRef.current),
      }),
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(
          '🚀 -------------------------------------------------------🚀',
        );
        console.log(
          '🚀 ~ file: Login.interactor.ts:126 ~ response:',
          response?.data,
        );
        console.log(
          '🚀 -------------------------------------------------------🚀',
        );
      })
      .catch(function (error) {
        console.log(
          '🚀 ---------------------------------------------------------------------🚀',
        );
        console.log(
          '🚀 ~ file: Login.interactor.ts:131 ~ loginAPIAfterPush ~ error:',
          error?.response.data,
        );
        console.log(
          '🚀 ---------------------------------------------------------------------🚀',
        );
      });
  };

  const logout = async () => {
    try {
      await clearSession();
    } catch (error) {
      console.log(
        '🚀 -------------------------------------------------------------🚀',
      );
      console.log(
        '🚀 ~ file: Login.interactor.ts:10 ~ loginAuth0 ~ error:',
        error,
      );
      console.log(
        '🚀 -------------------------------------------------------------🚀',
      );
    }
  };

  return {
    login,
    logout,
    loginAPI,
    loginAPIRequestPush,
    loginAPIAfterPush,
  };
};

export default useLoginInteractor;
