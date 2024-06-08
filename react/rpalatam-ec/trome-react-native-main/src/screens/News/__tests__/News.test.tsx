import { act, cleanup, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'
import { Banner } from 'react-native-ad-manager'

import { useAuth } from '../../../context/auth'
import { FavoritesProvider } from '../../../context/favorites'
import { NavigationProvider } from '../../../context/navigation'
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
    addListener: jest.fn(),
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

beforeEach(() => {
  mockUseAuth.mockImplementation(() => ({
    isSubscribed: false,
    user: {},
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
})
