import analytics from '@react-native-firebase/analytics'
import crashlytics from '@react-native-firebase/crashlytics'
import { EventEmitter } from 'events'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Linking } from 'react-native'

import { User } from '../entities/User'
import auth from '../services/auth'
import subscription from '../services/subscription'
import { googleSignOut, init, tokenExchange } from '../utils/auth'
import { ENABLE_AUTHENTICATION } from '../utils/flags'
import { sendPostMessageToWebview } from '../utils/refs'

type AuthListener = (isAuthenticated: boolean) => void

interface Context {
  isAuthenticated: boolean | undefined
  isSubscribed: boolean | undefined
  signin: (provider: string) => void
  signout: () => Promise<void>
  updateUserProfile: (userProfile: User) => Promise<void>
  onAuthenticationChange: (listener: AuthListener) => () => void
  user: User
  verifySubscription: () => Promise<void>
}

const AuthContext = createContext<Context>({} as Context)
const authEmitter = new EventEmitter()
const AUTH_EVENT_NAME = 'auth.event'

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>()
  const [user, setUser] = useState<User>({})
  const [subscriptor, setSubscriptor] = useState<boolean>()

  const onAuthenticationChange = useCallback((listener: AuthListener) => {
    authEmitter.on(AUTH_EVENT_NAME, listener)
    return function () {
      authEmitter.off(AUTH_EVENT_NAME, listener)
    }
  }, [])

  useEffect(() => {
    init()
    const restoreSession = async () => {
      try {
        if (!ENABLE_AUTHENTICATION) return setIsAuthenticated(false)
        const token = await auth.getToken()
        if (!token) return setIsAuthenticated(false)
        setIsAuthenticated(true)
      } catch (error) {
        if (error instanceof Error) crashlytics().recordError(error)
        setIsAuthenticated(false)
      }
    }
    restoreSession()
  }, [])

  const signin = useCallback((_: string) => {
    setIsAuthenticated(true)
    authEmitter.emit(AUTH_EVENT_NAME, true)
  }, [])

  const signout = useCallback(async () => {
    await auth.logout()
    await googleSignOut()
    await analytics().logEvent('logout')
    setIsAuthenticated(false)
    sendPostMessageToWebview('Home', { type: 'auth.LOGOUT' })
    authEmitter.emit(AUTH_EVENT_NAME, false)
  }, [])

  const updateUserProfile = useCallback(async (data: User) => {
    sendPostMessageToWebview('Home', {
      type: 'auth.PROFILE',
      payload: { ...data },
    })
    setUser(data)
  }, [])

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return
    if (isAuthenticated) {
      auth
        .getUserProfile()
        .then((profile) => {
          sendPostMessageToWebview('Home', {
            type: 'auth.PROFILE',
            payload: { ...profile },
          })
          setUser(profile)
        })
        .catch((error) => {
          signout()
          crashlytics().recordError(error)
        })
    } else {
      setUser({})
    }
  }, [isAuthenticated, signout])

  const verifySubscription = useCallback(async () => {
    if (!subscription) return
    try {
      const params: Record<string, string | undefined> = { id: user.id }
      const status = await subscription.checkAccess(params)
      setSubscriptor(status)
    } catch (error) {
      if (error instanceof Error) crashlytics().recordError(error)
    }
  }, [user.id])

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return
    if (isAuthenticated && !user.id) return
    if (isAuthenticated && user.id) {
      verifySubscription()
    } else {
      setSubscriptor(false)
    }
  }, [isAuthenticated, user.id, verifySubscription])

  useEffect(() => {
    if (typeof isAuthenticated === 'undefined') return
    if (isAuthenticated && !user.id) return
    const id = user.id || null
    analytics().setUserId(id)
    crashlytics().setUserId(id || '')
  }, [isAuthenticated, user.id])

  useEffect(() => {
    if (typeof subscriptor === 'undefined') return
    const type = subscriptor ? 'premium' : 'free'
    analytics().setUserProperty('account_type', type)
    sendPostMessageToWebview('Home', {
      type: 'subscription.UPDATE_STATUS',
      payload: { status: subscriptor },
    })
  }, [subscriptor])

  useEffect(() => {
    const callback = async (params: { url: string }) => {
      try {
        const config = auth.getOAuthConfig?.()
        if (!config) return
        if (!params.url.startsWith(config.redirect_url)) return
        const token = await tokenExchange(config, params.url)
        await auth.setToken(token)
        signin('oauth')
      } catch (_) {}
    }
    const listener = Linking.addEventListener('url', callback)
    return () => {
      listener.remove()
    }
  }, [signin])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isSubscribed: subscriptor,
        signin,
        signout,
        updateUserProfile,
        onAuthenticationChange,
        user,
        verifySubscription,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): Context => useContext(AuthContext)
