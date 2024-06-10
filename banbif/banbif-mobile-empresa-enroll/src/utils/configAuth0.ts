
const DOMAIN = 'banbifpj.us.auth0.com' 
const config = {
    // dev banbif
    domain: DOMAIN,
    clientId: '1wIqLeGABOKMjZVnpjonZAc22cwpYgAV',
    clientSecret: 'LZo_nwqv-yVaQHR3srR1tP4bnIf-7Iq_lfDmCD3p917nj1V9ak9YSPNkHIb9cTcJ',
    guardianServiceUrl: 'banbifpj.guardian.us.auth0.com',
    mfaAudience: `https://${DOMAIN}/mfa/`,
    tokenEndpoint: `https://${DOMAIN}/oauth/token`,
}
export default config