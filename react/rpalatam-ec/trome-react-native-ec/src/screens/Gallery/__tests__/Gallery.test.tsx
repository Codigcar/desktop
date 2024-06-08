import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { act, cleanup, render } from '@testing-utils/library'
import React from 'react'
import { Platform } from 'react-native'
import { Interstitial } from 'react-native-ad-manager'
import Orientation from 'react-native-orientation-locker'

import { useAuth } from '../../../context/auth'
import GalleryScreen, { refImageViewer } from '../Gallery'

const Stack = createStackNavigator()

const Container: React.FC = ({ children }) => (
  <NavigationContainer>
    <Stack.Navigator>{children}</Stack.Navigator>
  </NavigationContainer>
)

const getImages = (length: number) => {
  return Array.from({ length }, (_, index) => index).map((index) => ({
    order: index,
    src: 'https://placehold.it/100',
    description: `Text ${index}`,
  }))
}

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

beforeEach(() => {
  jest.useFakeTimers()
  mockUseAuth.mockImplementation(() => ({
    isSubscribed: false,
  }))
  jest.spyOn(console, 'error').mockImplementation(() => jest.fn())
})

afterEach(cleanup)

describe('Gallery screen', () => {
  it('should unlock/lock rotation in android', () => {
    Platform.OS = 'android'
    const fnLock = jest.fn()
    const fnUnlock = jest.fn()
    Orientation.lockToPortrait = fnLock
    Orientation.unlockAllOrientations = fnUnlock

    const photos = getImages(1)
    const album = { count: photos.length, photos }
    const { unmount } = render(
      <Container>
        <Stack.Screen
          component={GalleryScreen}
          name="Gallery"
          initialParams={{ album }}
        />
      </Container>,
    )
    expect(fnUnlock).toHaveBeenCalled()
    unmount()
  })

  it('should unlock/lock rotation in iOS', () => {
    Platform.OS = 'ios'
    const fnLock = jest.fn()
    const fnUnlock = jest.fn()
    Orientation.lockToPortrait = fnLock
    Orientation.unlockAllOrientations = fnUnlock

    const photos = getImages(1)
    const album = { count: photos.length, photos }
    const { unmount } = render(
      <Container>
        <Stack.Screen
          component={GalleryScreen}
          name="Gallery"
          initialParams={{ album }}
        />
      </Container>,
    )
    expect(fnUnlock).toHaveBeenCalled()
    unmount()
  })

  it('should render close icon and hide counter', () => {
    const photos = getImages(1)
    const album = { count: photos.length, photos }
    const { queryByText, getByTestId } = render(
      <Container>
        <Stack.Screen
          component={GalleryScreen}
          name="Gallery"
          initialParams={{ album }}
        />
      </Container>,
    )

    expect(getByTestId('gallery-close-icon')).toBeTruthy()
    expect(queryByText('1 / 1')).toBeNull()
  })

  it('should render counter when there are more than 2 images', () => {
    const photos = getImages(2)
    const album = { count: photos.length, photos }
    const { getByText } = render(
      <Container>
        <Stack.Screen
          component={GalleryScreen}
          name="Gallery"
          initialParams={{ album }}
        />
      </Container>,
    )
    expect(getByText('1 / 2')).toBeTruthy()
  })

  it('should show/hide header and caption', () => {
    const photos = getImages(15)
    const album = { count: photos.length, photos }

    const { getByTestId } = render(
      <Container>
        <Stack.Screen
          component={GalleryScreen}
          name="Gallery"
          initialParams={{ album }}
        />
      </Container>,
    )

    refImageViewer.current?.props.onClick?.()
    act(() => jest.advanceTimersByTime(100))
    expect(getByTestId('caption-animated-view').props.style.opacity).toBe(0)
    expect(getByTestId('header-animated-view').props.style.opacity).toBe(0)

    refImageViewer.current?.props.onClick?.()
    act(() => jest.advanceTimersByTime(100))
    expect(getByTestId('caption-animated-view').props.style.opacity).toBe(1)
    expect(getByTestId('header-animated-view').props.style.opacity).toBe(1)
  })

  it('should render ad with an interval of 4', () => {
    const mockRequestAdFn = jest.fn(() => Promise.resolve())
    const requestAd = Interstitial.requestAd as jest.Mock
    requestAd.mockImplementation(mockRequestAdFn)

    const photos = getImages(15)
    const album = { count: photos.length, photos }

    render(
      <Container>
        <Stack.Screen
          component={GalleryScreen}
          name="Gallery"
          initialParams={{ album }}
        />
      </Container>,
    )

    photos.forEach((_, index) => {
      refImageViewer.current?.props.onChange?.(index)
    })
    expect(mockRequestAdFn).toHaveBeenCalledTimes(3)
  })

  it('should render ad with an interval greater than 4', () => {
    const mockRequestAdFn = jest.fn(() => Promise.resolve())
    const requestAd = Interstitial.requestAd as jest.Mock
    requestAd.mockImplementation(mockRequestAdFn)

    const photos = getImages(50)
    const album = { count: photos.length, photos }

    render(
      <Container>
        <Stack.Screen
          component={GalleryScreen}
          name="Gallery"
          initialParams={{ album }}
        />
      </Container>,
    )

    photos.forEach((_, index) => {
      refImageViewer.current?.props.onChange?.(index)
    })
    expect(mockRequestAdFn).toHaveBeenCalledTimes(6)
  })

  it('should not render ad when user is premium', async () => {
    mockUseAuth.mockImplementation(() => ({
      isSubscribed: true,
    }))

    const mockRequestAdFn = jest.fn(() => Promise.resolve())
    const requestAd = Interstitial.requestAd as jest.Mock
    requestAd.mockImplementation(mockRequestAdFn)

    const photos = getImages(15)
    const album = { count: photos.length, photos }

    render(
      <Container>
        <Stack.Screen
          component={GalleryScreen}
          name="Gallery"
          initialParams={{ album }}
        />
      </Container>,
    )

    photos.forEach((_, index) => {
      refImageViewer.current?.props.onChange?.(index)
    })
    expect(mockRequestAdFn).not.toHaveBeenCalled()
  })
})
