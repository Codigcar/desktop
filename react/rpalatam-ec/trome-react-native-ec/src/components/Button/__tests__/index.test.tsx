import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Button from '../Button'

describe('Button', () => {
  it('Button text', () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <Button title="title" onPress={onPress} type="primary" />,
    )
    fireEvent.press(getByText('title'))
    expect(onPress).toBeCalled()
  })

  it('Button with icon', () => {
    const { getByTestId } = render(
      <Button
        title="title"
        onPress={jest.fn}
        icon={<Icon name="eye" testID="password-icon" />}
        disabled
      />,
    )
    expect(getByTestId('password-icon')).toBeDisabled()
  })
})
