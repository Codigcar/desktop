import React, {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { Animated, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Box from '../components/box'
import Typography from '../components/typography'
import { App } from '../utils/config'
import type { AllProps } from '../theme/index'

const { SafeAreaView, View } = Box
const { Paragraph } = Typography

interface Context {
  hide: () => void
  show: (opts: NotifyOptions) => void
}

type NotifyType = 'success' | 'error'

export interface NotifyOptions {
  message: string
  type: NotifyType
  duration?: number
  action?: React.ComponentType | null
}

interface NotifyProps {
  close(callback: () => void): void
  open(): void
}

type NotifyRef = {
  update(options?: NotifyOptions): void
  open: boolean
}

export const NotificationContext = React.createContext<Context>({} as Context)

const bgcolor: Record<NotifyType, string> = {
  success: App.key === 'elcomercio' ? '#FFCB05' : '#0089ff',
  error: '#EF4444',
}

const icon: Record<NotifyType, string> = {
  success: 'check-circle-outline',
  error: 'close-circle-outline',
}

const textcolor: Record<NotifyType, string> = {
  success: App.key === 'elcomercio' ? '#3C3C3C' : '#FFFFFF',
  error: '#FFFFFF',
}

const propStyles = {
  text: App.select<AllProps>({
    elcomercio: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    default: { fontSize: 'sm' },
  }),
  view: App.select<AllProps>({
    elcomercio: {
      borderTopLeftRadius: 'lg',
      borderTopRightRadius: 'lg',
      elevation: 1,
      paddingVertical: '1',
      shadowColor: 'text.2',
      shadowOpacity: 0.53,
      shadowRadius: 6.27,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
    default: {},
  }),
  subView: App.select<AllProps>({
    elcomercio: { flexDirection: 'column' },
    default: { flexDirection: 'row' },
  }),
}

const Notify = React.forwardRef<NotifyRef, NotifyProps>((props, ref) => {
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [notify, setNotify] = useState<NotifyOptions>()
  const { close, open } = props

  useEffect(() => {
    if (!!notify) {
      open()
      closeTimeoutRef.current = setTimeout(() => {
        close(() => setNotify(undefined))
      }, notify.duration || 5000)
    }
    return () => {
      closeTimeoutRef.current && clearTimeout(closeTimeoutRef.current)
    }
  }, [close, open, notify])

  useImperativeHandle(
    ref,
    () => ({
      update: setNotify,
      open: false,
    }),
    [],
  )

  if (!notify) return null

  const { message, type, action: Action } = notify

  return (
    <View style={{ backgroundColor: bgcolor[type] }} {...propStyles.view}>
      <SafeAreaView edges={['bottom']}>
        <View alignItems="center" px="0.5" py="0.75" {...propStyles.subView}>
          <View flex={1} alignItems="center" flexDirection="row">
            {App.key !== 'elcomercio' ? (
              <View mr="0.5">
                <Icon name={icon[type]} color="#FFFFFF" size={16} />
              </View>
            ) : null}
            <View flex={1}>
              <Paragraph
                style={{ color: textcolor[type] }}
                {...propStyles.text}>
                {message}
              </Paragraph>
            </View>
          </View>
          {!Action ? null : <Action />}
        </View>
      </SafeAreaView>
    </View>
  )
})

export const NotificationProvider: React.FC = ({ children }) => {
  const notifyRef = useRef<NotifyRef>(null)
  const translateAnimatedRef = useRef(new Animated.Value(0))
  const translateValue = translateAnimatedRef.current.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  })

  const animatedStyles = {
    transform: [
      {
        translateY: translateValue,
      },
    ],
  }

  const handleClose = useCallback((callback?: () => void) => {
    Animated.timing(translateAnimatedRef.current, {
      toValue: 0,
      useNativeDriver: true,
      duration: notifyRef.current?.open ? 250 : 0,
    }).start(() => {
      if (notifyRef.current) notifyRef.current.open = false
      callback?.()
    })
  }, [])

  const handleOpen = useCallback(() => {
    Animated.timing(translateAnimatedRef.current, {
      toValue: 1,
      useNativeDriver: true,
      duration: 250,
    }).start()
    if (notifyRef.current) notifyRef.current.open = true
  }, [])

  const hide = useCallback(() => {
    handleClose(() => notifyRef.current?.update())
  }, [handleClose])

  const show = useCallback(
    (options: NotifyOptions) => {
      handleClose(() => notifyRef.current?.update(options))
    },
    [handleClose],
  )

  return (
    <NotificationContext.Provider value={{ hide, show }}>
      {children}
      <Animated.View style={[styles.container, animatedStyles]}>
        <Notify ref={notifyRef} close={handleClose} open={handleOpen} />
      </Animated.View>
    </NotificationContext.Provider>
  )
}

export const useNotification = (): Context => useContext(NotificationContext)

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    transform: [{ translateY: 200 }],
    width: '100%',
  },
})
