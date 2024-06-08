import { fireEvent, render } from '@testing-utils/library'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import Button from '../Button'

describe('Button', () => {
  it('Button text', () => {
    const onPress = jest.fn()
    const { queryByText, getByTestId } = render(
      <Button title="label" onPress={onPress} testID="button" type="primary" />,
    )
    const btn = getByTestId('button')
    fireEvent.press(btn)
    expect(onPress).toBeCalledTimes(1)
    expect(queryByText('label')).toHaveStyle({
      color: '#FFFFFF',
    })
  })

  it('Button with icon', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <Button
        title="button"
        onPress={onPress}
        testID="button"
        icon={<Icon name="eye" testID="password-icon" />}
        disabled
      />,
    )
    expect(getByTestId('password-icon')).toBeDefined()
    expect(getByTestId('password-icon')).toBeDisabled()
  })
})
