import config from "../../../../../src/utils/configAuth0";

const MfaService = {
    associate : async function(accessToken:any) {
        try {
            let result = await fetch(config.mfaAudience + 'associate', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                },
                body: JSON.stringify({
                    client_id: config.clientId,
                    authenticator_types: ["oob"],
                    oob_channels: ["auth0"]
                }),
            });
            return result.json();
        }
        catch(e) {
            console.log("🚀 -------------------------------------------------------🚀")
            console.log("🚀 ~ file: MfaService.ts:22 ~ associate:function ~ e:", e)
            console.log("🚀 -------------------------------------------------------🚀")
            console.log(e);
            return null;
        }
    },

    retrieveMfaToken: async function(refreshToken: any) {
        try {
            var body:any = {
                'client_id': config.clientId,
                'refresh_token': refreshToken,
                'grant_type': 'refresh_token',
                'request_mfa' : 'true'
            };
            
            var formBody:any = [];
            for (var property in body) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(body[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
        
            let result = await fetch(config.tokenEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody
            });
 
            let json = await result.json();

            return json.mfa_token;
        }
        catch(e) {
            console.log("🚀 --------------------------------------------------------------🚀")
            console.log("🚀 ~ file: MfaService.ts:60 ~ retrieveMfaToken:function ~ e:", e)
            console.log("🚀 --------------------------------------------------------------🚀")
            console.log(e);
            return null;
        }
       
    },
    
    completeChallengeWithOtp: async function(totpCode:any, mfaToken:any) {
        try {
            var body:any = {
                'client_id': config.clientId,
                'grant_type': 'http://auth0.com/oauth/grant-type/mfa-otp',
                'mfa_token' : mfaToken,
                'otp' : totpCode
            };
            
            var formBody:any = [];
            for (var property in body) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(body[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
        
            let result = await fetch(config.tokenEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody
            });
            let json = await result.json();
            return json;
        }
        catch(e) {
            console.log("🚀 ----------------------------------------------------------------------🚀")
            console.log("🚀 ~ file: MfaService.ts:97 ~ completeChallengeWithOtp:function ~ e:", e)
            console.log("🚀 ----------------------------------------------------------------------🚀")
            console.log(e);
            return null;
        }
       
    }
}







export default MfaService;