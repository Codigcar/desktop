import config from '../../../../src/utils/configAuth0';
import {useAuth} from '../../../../src/context/auth.provider';
import axios from 'axios';

const qs = require('qs');
const useLoginInteractor = () => {
  const {user, signIn} = useAuth();

  const loginAPI = async () => {
    let data = qs.stringify({
      grant_type: 'password',
      client_id: 'kT4xJ6156razq3zgWMpJsgqk7D6A8vBx',
      audience: `https://${config.domain}/mfa/`,
      username: 'test1@bb.com',
      password: 'QWEasd123',
      scope: 'openid profile read:sample',
    });

    let configAXIOS = {
      method: 'post',
      maxBodyLength: Infinity,
      // url: 'https://dev-ck5xygantqyh3z6t.us.auth0.com/oauth/token',
      url: `https://${config.domain}/oauth/token`,
      headers: {
        Cookie:
          'did=s%3Av0%3Af2b40370-1444-11ef-af99-29d25cb702f4.6ViUa%2FDGDyF6GS9LEEe%2FwoI3cBwsVCV%2Fc5u0xFGMllc; did_compat=s%3Av0%3Af2b40370-1444-11ef-af99-29d25cb702f4.6ViUa%2FDGDyF6GS9LEEe%2FwoI3cBwsVCV%2Fc5u0xFGMllc',
        'Content-Type': 'application/x-www-form-urlencoded',
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
        signIn({
          mfa_token: error?.response?.data.mfa_token,
          name: 'example',
        });
      });
  };

  return {
    loginAPI,
  };
};

export default useLoginInteractor;
