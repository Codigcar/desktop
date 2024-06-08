import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'
import { Alert } from 'react-native'
import { Banner } from 'react-native-ad-manager'

import { useAuth } from '../../../context/auth'
import { FavoritesProvider } from '../../../context/favorites'
import { NavigationProvider } from '../../../context/navigation'
import { useNotification } from '../../../context/notification'
import { App } from '../../../utils/config'
import NewsScreen from '../News'

const Container = ({ children }: { children: JSX.Element }) => (
  <NavigationProvider>
    <FavoritesProvider>{children}</FavoritesProvider>
  </NavigationProvider>
)

const MOCK_RESPONSE = {
  data: {
    content_elements: [
      {
        _id: '1',
        canonical_url: 'url',
        headlines: { basic: 'title_one' },
        last_updated_date: 'date',
        subheadlines: { basic: 'description_one' },
        type: 'story',
      },
      {
        _id: '2',
        canonical_url: 'url',
        headlines: { basic: 'title_two' },
        last_updated_date: 'date',
        subheadlines: { basic: 'description_two' },
        type: 'story',
      },
    ],
    type: 'results',
  },
}

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: jest.fn(),
    push: jest.fn(),
  })),
  useRoute: jest.fn(() => ({
    params: {
      section: {
        name: 'politics',
        path: 'politics',
      },
    },
  })),
}))

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

jest.mock('../../../context/notification')
const mockUseNotification = useNotification as jest.Mock

beforeEach(() => {
  mockUseAuth.mockImplementation(() => ({
    isSubscribed: false,
    user: {},
  }))
  mockUseNotification.mockImplementation(() => ({
    show: jest.fn(),
  }))
})

afterEach(() => {
  MockAxios.reset()
  cleanup()
})

describe('News screen page', () => {
  it('should render card and ad', async () => {
    const { getByTestId, getAllByTestId, getByText, toJSON } = render(
      <Container>
        <NewsScreen />
      </Container>,
    )
    expect(getAllByTestId('placeholder')).toBeDefined()
    await act(async () => undefined)
    await act(async () => MockAxios.mockResponse(MOCK_RESPONSE))

    const title = getByText('title_one')
    expect(title).toBeDefined()
    fireEvent.press(title)

    const screen = getByTestId('News-screen')
    // eslint-disable-next-line testing-library/await-async-query
    expect(screen.findByType(Banner)).toBeDefined()
    expect(toJSON()).toMatchSnapshot()
  })

  it('should not render ad when user is premium', async () => {
    mockUseAuth.mockImplementation(() => ({
      isSubscribed: true,
      user: { id: 'id' },
    }))

    const { getByTestId, getByText } = render(
      <Container>
        <NewsScreen />
      </Container>,
    )
    await act(async () => MockAxios.mockResponse(MOCK_RESPONSE))

    expect(getByText('title_one')).toBeDefined()

    const screen = getByTestId('News-screen')
    try {
      // eslint-disable-next-line testing-library/await-async-query
      screen.findByType(Banner)
      expect(true).toBe(false)
    } catch (error) {
      const message = 'No instances found with node type: "Banner"'
      expect((error as Error).message).toBe(message)
    }
  })

  it('should change icon when section is added or removed', async () => {
    App.key = 'gestion'
    const { getByTestId } = render(
      <Container>
        <NewsScreen />
      </Container>,
    )
    const req = MockAxios.getReqByMatchUrl(/navigation-by-hierarchy/)
    const category = { display_name: 'Política', url: '/politics/', _id: 'id' }
    const spy = jest.spyOn(Alert, 'alert')
    MockAxios.mockResponse(MOCK_RESPONSE)
    MockAxios.mockResponse({ data: { children: [category] } }, req)
    await act(async () => undefined)

    const icon = getByTestId('icon-home')
    const { name } = icon.props
    fireEvent.press(icon)
    const [, , buttons] = spy.mock.calls[0]
    buttons?.[1].onPress?.()
    await act(async () => undefined)
    expect(getByTestId('icon-home').props.name).not.toBe(name)
  })

  it('should show notification when section is added or removed', async () => {
    App.key = 'gestion'

    const fnShow = jest.fn()
    mockUseNotification.mockImplementation(() => ({
      show: fnShow,
    }))

    const { getByTestId } = render(
      <Container>
        <NewsScreen />
      </Container>,
    )
    const req = MockAxios.getReqByMatchUrl(/navigation-by-hierarchy/)
    const category = { display_name: 'Política', url: '/politics/', _id: 'id' }
    MockAxios.mockResponse(MOCK_RESPONSE)
    MockAxios.mockResponse({ data: { children: [category] } }, req)
    await act(async () => undefined)

    const icon = getByTestId('icon-home')
    fireEvent.press(icon)
    await act(async () => undefined)
    expect(fnShow).toBeCalledWith(expect.objectContaining({ type: 'success' }))
  })
})
