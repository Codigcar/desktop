import AsyncStorage from '@react-native-async-storage/async-storage'
import { Link, useFocusEffect, useNavigation } from '@react-navigation/native'
import { renderHook } from '@testing-library/react-hooks'
import { act, fireEvent, render } from '@testing-utils/library'
import MockAxios from 'jest-mock-axios'
import React from 'react'
import { Interstitial } from 'react-native-ad-manager'

import { useAuth } from '../../../context/auth'
import { useMainNavigation } from '../../../context/navigation'
import Home, { useOnLink } from '../Home.gestion'
import HOME_SCREEN_SHOWN from '../homeShown'

const mockLogEvent = jest.fn()
jest.mock('@react-native-firebase/analytics', () =>
  jest.fn(() => ({ logEvent: mockLogEvent })),
)

jest.mock('@react-navigation/native')
const mockUseFocusEffect = useFocusEffect as jest.Mock
const mockUseNavigation = useNavigation as jest.Mock
const mockLink = Link as jest.Mock
mockLink.mockImplementation(({ children, ...rest }) =>
  React.createElement('Link', rest, children),
)

jest.mock('react-native/Libraries/Lists/SectionList', () => {
  const RN = jest.requireActual('react-native/Libraries/Lists/SectionList')
  const R = jest.requireActual('react')
  return {
    __esModule: true,
    default: R.forwardRef((props: Record<string, unknown>, ref: unknown) => (
      <RN.default {...props} ref={ref} initialNumToRender={15} />
    )),
  }
})

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock
mockUseAuth.mockReturnValue({ isSubscribed: false })

jest.mock('../../../context/favorites', () => ({
  useFavorites: jest
    .fn()
    .mockReturnValue({ favorites: [], toggleFavorite: jest.fn() }),
}))

jest.mock('../../../context/navigation')
const mockUseMainNavigation = useMainNavigation as jest.Mock
mockUseMainNavigation.mockReturnValue({ categories: [] })

const createStories = (prefix: string, quantity: number) => {
  return Array.from({ length: quantity }).map((_, index) => ({
    _id: `id_${index}`,
    canonical_url: 'url',
    headlines: { basic: `${prefix}_title_${index}` },
    last_updated_date: 'date',
    subheadlines: { basic: `${prefix}_description_${index}` },
    type: 'story',
  }))
}

const HEADLINES_RESPONSE = {
  data: { content_elements: createStories('headline', 6), type: 'results' },
}

const SECTION_RESPONSE = {
  data: { content_elements: createStories('section', 2), type: 'results' },
}

describe('Home.gestion', () => {
  afterEach(MockAxios.reset)

  it('render placeholder', async () => {
    const { getAllByTestId, queryByTestId } = render(<Home />)
    expect(getAllByTestId('placeholder')).toBeDefined()
    const req = MockAxios.getReqByMatchUrl(/home\.json$/)
    await act(async () => MockAxios.mockResponse(HEADLINES_RESPONSE, req))
    expect(queryByTestId('placeholder')).toBeNull()
  })

  it('navigate to custom content screen', async () => {
    const navigate = jest.fn()
    mockUseNavigation.mockReturnValue({ navigate })
    const { getByA11yLabel } = render(<Home />)
    await act(async () => undefined)
    fireEvent.press(getByA11yLabel('Mi Contenido'))
    expect(navigate).toBeCalledWith('CustomContent')
  })

  it('set HOME_SCREEN_SHOWN', async () => {
    const set = jest.spyOn(HOME_SCREEN_SHOWN, 'set')
    render(<Home />)
    await act(async () => undefined)
    expect(set).toBeCalledTimes(1)
  })

  it('fetch home and section stories with refresh control', async () => {
    mockUseMainNavigation.mockReturnValue({
      categories: [{ label: 'Perú', path: '/category/peru', active: true }],
    })
    const { getByTestId } = render(<Home />)
    await act(async () => MockAxios.mockResponse(SECTION_RESPONSE))
    expect(MockAxios.get).toBeCalledTimes(1)
    const home = getByTestId('home-list')

    await act(async () => {
      home.props.refreshControl.props.onRefresh()
      MockAxios.mockResponse(HEADLINES_RESPONSE)
    })
    await act(async () => MockAxios.mockResponse(SECTION_RESPONSE))
    expect(MockAxios.get).toBeCalledTimes(3)
    expect(home.props.refreshControl.props.refreshing).toBeFalsy()
  })

  describe('headlines', () => {
    it('render headlines cards', async () => {
      const { getByText } = render(<Home />)
      await act(async () => undefined)
      expect(getByText('headline_title_0')).toBeDefined()
      expect(getByText('headline_title_1')).toBeDefined()
    })

    it('render ads when user is not a subscriber', async () => {
      mockUseAuth.mockReturnValue({ isSubscribed: false })
      const { getByTestId, queryByTestId } = render(<Home />)
      await act(async () => undefined)
      expect(getByTestId('ad_unit_caja1')).toBeDefined()
      expect(getByTestId('ad_unit_caja2')).toBeDefined()
      expect(queryByTestId('ad_unit_caja3')).toBeNull()
    })

    it('not render ads when user is a subscriber', async () => {
      mockUseAuth.mockReturnValue({ isSubscribed: true })
      const { queryByText } = render(<Home />)
      await act(async () => undefined)
      expect(queryByText('ad_unit_caja1')).toBeNull()
      expect(queryByText('ad_unit_caja2')).toBeNull()
    })
  })

  describe('sections', () => {
    const categories = [
      { label: 'Política', path: '/category/politica', active: true },
      { label: 'Economía', path: '/category/economia', active: false },
      { label: 'Perú', path: '/category/peru', active: true },
    ]
    const actives = categories.filter((category) => category.active)

    beforeAll(() => {
      mockUseMainNavigation.mockReturnValue({ categories })
    })

    it('render active sections', async () => {
      const { getByText, queryByText } = render(<Home />)
      actives.forEach(() => MockAxios.mockResponse(SECTION_RESPONSE))
      await act(async () => undefined)
      actives.forEach((c) => expect(getByText(c.label)).toBeDefined())
      expect(queryByText('Economía')).toBeNull()
    })

    it('render ads in section footer', async () => {
      mockUseAuth.mockReturnValue({ isSubscribed: false })
      const { getByTestId, queryByTestId } = render(<Home />)
      actives.forEach(() => MockAxios.mockResponse(SECTION_RESPONSE))
      await act(async () => undefined)
      expect(getByTestId('ad_unit_caja3')).toBeDefined()
      expect(getByTestId('ad_unit_caja4')).toBeDefined()
      expect(queryByTestId('ad_unit_caja5')).toBeNull()
    })
  })

  describe('advertising interstitial', () => {
    beforeEach(async () => {
      await AsyncStorage.clear()
      jest.spyOn(HOME_SCREEN_SHOWN, 'get').mockReturnValue(true)
      jest.spyOn(Interstitial, 'requestAd').mockClear()
      mockUseAuth.mockReturnValue({ isSubscribed: false })
      mockUseFocusEffect.mockImplementation((fn) => fn())
    })

    it('do request interstitial', async () => {
      render(<Home />)
      await act(async () => undefined)
      expect(Interstitial.requestAd).toBeCalled()
    })

    it('do not request ad when HOME_SCREEN_SHOWN is false', async () => {
      jest.spyOn(HOME_SCREEN_SHOWN, 'get').mockReturnValue(false)
      render(<Home />)
      await act(async () => undefined)
      expect(Interstitial.requestAd).not.toBeCalled()
    })

    it('do not request ad when isSubscribed is undefined', async () => {
      mockUseAuth.mockReturnValue({ isSubscribed: undefined })
      render(<Home />)
      await act(async () => undefined)
      expect(Interstitial.requestAd).not.toBeCalled()
    })

    it('do not request when user is a subscriber', async () => {
      mockUseAuth.mockReturnValue({ isSubscribed: true })
      render(<Home />)
      await act(async () => undefined)
      expect(Interstitial.requestAd).not.toBeCalled()
    })
  })

  describe('useOnLink', () => {
    it('do not send event when link is null', () => {
      const { result } = renderHook(() => useOnLink())
      result.current(null)
      expect(mockLogEvent).not.toBeCalled()
    })

    it('send event with url pathname', () => {
      const { result } = renderHook(() => useOnLink())
      result.current('https://gestion.pe/section/')
      expect(mockLogEvent).toBeCalledWith('link_app_open', {
        pathname: '/section/',
      })
    })

    it('navigate to story from link', () => {
      const push = jest.fn()
      mockUseNavigation.mockReturnValue({ push })
      const { result } = renderHook(() => useOnLink())
      result.current({ url: 'https://gestion.pe/section/pathname-noticia/' })
      expect(push).toBeCalledWith('Story', {
        pathname: '/section/pathname-noticia/',
      })
    })
  })
})
