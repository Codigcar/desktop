import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Button, Text } from 'react-native'
import { act } from 'react-test-renderer'

import {
  NotificationProvider,
  NotifyOptions,
  useNotification,
} from '../notification'

function TestComponent(options: NotifyOptions) {
  const notification = useNotification()
  return (
    <>
      <Button title="hide" onPress={() => notification.hide()} />
      <Button title="show" onPress={() => notification.show(options)} />
    </>
  )
}

jest.useFakeTimers()

describe('notification context', () => {
  it('should render basic success alert', () => {
    const { getByText } = render(
      <NotificationProvider>
        <TestComponent message="custom-message" type="success" />
      </NotificationProvider>,
    )
    fireEvent.press(getByText('show'))
    expect(getByText('custom-message')).toBeDefined()
  })

  it('should render basic error alert', () => {
    const { getByText } = render(
      <NotificationProvider>
        <TestComponent message="custom-message" type="error" />
      </NotificationProvider>,
    )
    fireEvent.press(getByText('show'))
    expect(getByText('custom-message')).toBeDefined()
  })

  it('should remove notification when time is up', () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <TestComponent message="custom-message" type="error" duration={1000} />
      </NotificationProvider>,
    )
    fireEvent.press(getByText('show'))
    act(() => {
      jest.advanceTimersByTime(1000)
    })
    expect(queryByText('custom-message')).toBeNull()
  })

  it('should remove notification when hide method is called', () => {
    const { getByText, queryByText } = render(
      <NotificationProvider>
        <TestComponent message="custom-message" type="error" duration={10000} />
      </NotificationProvider>,
    )
    fireEvent.press(getByText('show'))
    fireEvent.press(getByText('hide'))
    act(() => {
      jest.advanceTimersByTime(250)
    })
    expect(queryByText('custom-message')).toBeNull()
  })

  it('should render notification with action', () => {
    const { getByText } = render(
      <NotificationProvider>
        <TestComponent
          message="message"
          type="success"
          action={() => <Text>custom-action</Text>}
        />
      </NotificationProvider>,
    )
    fireEvent.press(getByText('show'))
    expect(getByText('custom-action')).toBeDefined()
  })
})
