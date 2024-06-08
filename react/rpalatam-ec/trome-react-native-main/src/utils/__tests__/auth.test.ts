import { appleAuth } from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-community/google-signin'
import MockAxios from 'jest-mock-axios'
import { Linking } from 'react-native'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { InAppBrowser } from 'react-native-inappbrowser-reborn'

import * as auth from '../auth'
import type { OAuth } from '../../services/auth/auth.types'

describe('auth', () => {
  describe('Google', () => {
    it('SignIn success response', async () => {
      const response = await auth.googleSignIn()
      expect(response).toEqual('token')
    })

    it('SignIn failed response', async () => {
      GoogleSignin.hasPlayServices = jest.fn().mockImplementation(() => {
        throw new Error('SignIn failed')
      })
      try {
        await auth.googleSignIn()
      } catch (error) {
        expect((error as Error).message).toBe('SignIn failed')
      }
    })

    it('SignOut void response', async () => {
      const response = await auth.googleSignOut()
      expect(response).toBeUndefined()
    })

    it('SignOut failed response', async () => {
      GoogleSignin.signOut = jest.fn().mockImplementation(() => {
        throw new Error('SignOut failed')
      })
      try {
        await auth.googleSignOut()
      } catch (error) {
        expect((error as Error).message).toBe('SignOut failed')
      }
    })
  })

  describe('Facebook', () => {
    it('SignIn response without token', async () => {
      try {
        await auth.facebookSignIn()
      } catch (error) {
        expect((error as Error).message).toEqual('Without token')
      }
    })

    it('SignIn success response', async () => {
      AccessToken.getCurrentAccessToken = jest
        .fn()
        .mockImplementation(() => ({ accessToken: 'token' }))
      const response = await auth.facebookSignIn()
      expect(response).toEqual('token')
    })

    it('SignIn failed response', async () => {
      LoginManager.logInWithPermissions = jest.fn().mockImplementation(() => {
        throw new Error('Without permissions')
      })
      try {
        await auth.facebookSignIn()
      } catch (error) {
        expect((error as Error).message).toBe('Without permissions')
      }
    })

    it('SignIn canceled response', async () => {
      LoginManager.logInWithPermissions = jest.fn().mockImplementation(() => ({
        isCancelled: true,
      }))
      await expect(auth.facebookSignIn()).rejects.toThrowError(Error)
    })
  })

  describe('Apple', () => {
    it('SignIn success response', async () => {
      appleAuth.performRequest = jest.fn().mockImplementation(() => ({
        identityToken: 'token',
      }))

      appleAuth.getCredentialStateForUser = jest
        .fn()
        .mockImplementation(() => 1)
      const response = await auth.appleSignIn()
      expect(response).toEqual('token')
    })
    it('Without permissions response', async () => {
      appleAuth.performRequest = jest.fn().mockImplementation(() => ({
        identityToken: 'token',
      }))

      appleAuth.getCredentialStateForUser = jest
        .fn()
        .mockImplementation(() => 0)
      try {
        await auth.appleSignIn()
      } catch (error) {
        expect((error as Error).message).toBe('Without permissions')
      }
    })

    it('Without id token response', async () => {
      appleAuth.performRequest = jest.fn().mockImplementation(() => {
        throw new Error('Without id token')
      })
      try {
        await auth.appleSignIn()
      } catch (error) {
        expect((error as Error).message).toBe('Without id token')
      }
    })
  })

  describe('OAuth', () => {
    const config: OAuth = {
      client_id: 'id',
      client_secret: 'secret',
      issuer: 'https://endpoint.com',
      redirect_url: 'scheme://oauth',
    }

    const tokenExchangeResponse = {
      access_token: 'at',
      refresh_token: 'rt',
      expires: 8400,
    }

    afterEach(MockAxios.reset)

    it('reject the request when the state is not the same as the stored one', async () => {
      const url = `${config.redirect_url}?code=123&state=abc`
      const promise = auth.tokenExchange(config, url)
      await expect(promise).rejects.toThrow()
    })

    it('add code exchange to request params', (done) => {
      const code = '123'
      auth.tokenExchange(config, `${config.redirect_url}?code=${code}`)
      expect(MockAxios.post).toBeCalledWith(
        `${config.issuer}/token`,
        expect.stringContaining(`code=${code}`),
        expect.objectContaining({}),
      )
      done()
    })

    it('get access token and refresh token from token exchange', async () => {
      const promise = auth.tokenExchange(config, `scheme://oauth?code=123`)
      MockAxios.mockResponse({ data: tokenExchangeResponse })
      await expect(promise).resolves.toEqual({
        access_token: tokenExchangeResponse.access_token,
        refresh_token: tokenExchangeResponse.refresh_token,
      })
    })

    it('open web authorize with Linking', async () => {
      jest.spyOn(InAppBrowser, 'isAvailable').mockResolvedValueOnce(false)
      const fnOpenURL = jest.spyOn(Linking, 'openURL')
      await expect(auth.authorize(config)).resolves.toBeNull()
      expect(fnOpenURL).toBeCalledWith(
        expect.stringContaining(`${config.issuer}/authorize`),
      )
    })

    it('open web authorize with InAppBrowser', async () => {
      jest.spyOn(InAppBrowser, 'isAvailable').mockResolvedValueOnce(true)
      const fnOpenAuth = jest
        .spyOn(InAppBrowser, 'openAuth')
        .mockResolvedValueOnce({ type: 'cancel' })
      await expect(auth.authorize(config)).resolves.toBeNull()
      expect(fnOpenAuth).toHaveBeenLastCalledWith(
        expect.stringContaining(`${config.issuer}/authorize`),
        expect.stringContaining(encodeURIComponent(config.redirect_url)),
      )
    })

    it('get url from InAppBrowser', async () => {
      jest.spyOn(InAppBrowser, 'isAvailable').mockResolvedValueOnce(true)
      const URL = 'scheme://oauth?code=123'
      jest
        .spyOn(InAppBrowser, 'openAuth')
        .mockResolvedValueOnce({ type: 'success', url: URL })
      await expect(auth.authorize(config)).resolves.toBe(URL)
    })
  })
})
