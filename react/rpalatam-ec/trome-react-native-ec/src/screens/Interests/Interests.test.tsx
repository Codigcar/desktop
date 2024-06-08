import { act, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'

import InterestScreen from './Interests'
import { STORE_INTERESTS } from '../../utils/constants'
import { storage } from '../../utils/storage'

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}))

const response = [
  {
    text: 'Pedro Castillo',
    slug: 'pedro-castillo',
  },
  {
    text: 'Coronavirus',
    slug: 'coronavirus',
  },
]

describe('interests screen', () => {
  afterEach(() => {
    storage.clearAll()
  })
  beforeAll(() => {
    MockAxios.mockResponse({ data: response })
  })

  it('should active the background color style for the first interest by default', async () => {
    const bgActive: StyleProp<ViewStyle> = { backgroundColor: '#AD9130' }
    const { getByA11yLabel } = render(<InterestScreen />)
    await act(async () => undefined)
    const touchableInterest = getByA11yLabel('recomendados')
    expect(touchableInterest).toHaveStyle(bgActive)
  })

  it('should render loading for initial request', async () => {
    const { getByTestId, queryByTestId } = render(<InterestScreen />)
    expect(getByTestId('ribbon-loading')).toBeDefined()
    await act(async () => undefined)
    expect(queryByTestId('ribbon-loading')).toBeNull()
  })

  it('should activate saved interest in the initial request', async () => {
    storage.set(STORE_INTERESTS, JSON.stringify(['pedro-castillo', 'mancora']))

    const { getByA11yLabel } = render(<InterestScreen />)
    await act(async () => undefined)
    expect(getByA11yLabel(response[0].slug)).toHaveProp('accessibilityState', {
      selected: true,
    })
    expect(getByA11yLabel(response[1].slug)).toHaveProp('accessibilityState', {
      selected: false,
    })
  })

  it('should save the interest when press toggle button', async () => {
    const { getByText } = render(<InterestScreen />)
    await act(async () => undefined)
    const btn = getByText(response[1].text)
    fireEvent.press(btn)
    const stored = storage.getString(STORE_INTERESTS)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const storedInfo = JSON.parse(stored!)
    expect(storedInfo).toContain(response[1].slug)
  })

  it('should remove the interest when press toggle button', async () => {
    storage.set(
      STORE_INTERESTS,
      JSON.stringify(['pedro-castillo', 'coronavirus']),
    )

    const { getByText } = render(<InterestScreen />)
    await act(async () => undefined)
    const btn = getByText(response[1].text)
    fireEvent.press(btn)
    const stored = storage.getString(STORE_INTERESTS)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const storedInfo = JSON.parse(stored!)
    expect(storedInfo).not.toContain(response[1].slug)
  })
})
