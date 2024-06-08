import { appleAuth } from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-community/google-signin'
import axios from 'axios'
import { Linking } from 'react-native'
import NativeConfig from 'react-native-config'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import { randomBytes } from 'react-native-randombytes'
import { sha256 } from 'react-native-sha256'
import { URL, URLSearchParams } from 'react-native-url-polyfill'

import type { OAuth, Token } from '../services/auth/auth.types'

export async function appleSignIn(): Promise<string> {
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    // Note: it appears putting FULL_NAME first is important, see issue #293
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  })

  if (!appleAuthRequestResponse.identityToken) {
    throw new Error('Without id token')
  }

  const credentialState = await appleAuth.getCredentialStateForUser(
    appleAuthRequestResponse.user,
  )

  if (credentialState !== appleAuth.State.AUTHORIZED) {
    throw new Error('Without permissions')
  }
  return appleAuthRequestResponse.identityToken
}

export async function googleSignIn(): Promise<string> {
  await GoogleSignin.hasPlayServices()
  const { idToken } = await GoogleSignin.signIn()
  if (!idToken) throw new Error('Without id token')
  return idToken
}

export async function googleSignOut(): Promise<void> {
  try {
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
  } catch (_) {}
}

export async function facebookSignIn(): Promise<string> {
  LoginManager.logOut()
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ])
  if (result.isCancelled) throw new Error('Cancelled')
  const data = await AccessToken.getCurrentAccessToken()
  const token = data?.accessToken.toString()
  if (!token) throw new Error('Without token')
  return token
}

export function init(): void {
  const options = {
    webClientId: NativeConfig.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
    iosClientId: NativeConfig.GOOGLE_IOS_CLIENT_ID,
  }
  GoogleSignin.configure(options)
}

function base64URLEncode(input: Buffer) {
  return input
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/[=]/g, '')
}

export const PKCE: Record<string, string | null> = {
  code_verifier: null,
  state: null,
}

interface TokenExchangeResponse {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
}

export async function tokenExchange(
  config: OAuth,
  url: string,
): Promise<Token> {
  const { searchParams } = new URL(url)
  if (searchParams.get('state') !== PKCE.state) {
    throw new Error(`OAuth state isn't found`)
  }
  const params = new URLSearchParams({
    client_id: config.client_id,
    code: String(searchParams.get('code')),
    code_verifier: String(PKCE.code_verifier),
    grant_type: 'authorization_code',
    redirect_uri: config.redirect_url,
  })
  const response = await axios.post<TokenExchangeResponse>(
    `${config.issuer}/token`,
    params.toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  )
  PKCE.code_verifier = null
  PKCE.state = null
  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token,
  }
}

export async function authorize(config: OAuth): Promise<string | null> {
  PKCE.code_verifier = base64URLEncode(randomBytes(32))
  PKCE.state = base64URLEncode(randomBytes(16))
  const code_encrypted = await sha256(PKCE.code_verifier)
  const challenge = base64URLEncode(Buffer.from(code_encrypted, 'hex'))
  const authorizeParams = new URLSearchParams({
    ...config.additional_parameters,
    client_id: config.client_id,
    code_challenge: challenge,
    code_challenge_method: 'S256',
    redirect_uri: config.redirect_url,
    response_type: 'code',
    state: PKCE.state,
  })
  const url = `${config.issuer}/authorize?${authorizeParams.toString()}`
  if (!(await InAppBrowser.isAvailable())) {
    await Linking.openURL(url)
    return null
  }
  const result = await InAppBrowser.openAuth(
    url,
    encodeURIComponent(config.redirect_url),
  )
  if (result.type !== 'success') return null
  return result.url
}
