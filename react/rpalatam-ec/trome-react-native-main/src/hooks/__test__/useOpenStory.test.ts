import { cleanup, renderHook } from '@testing-library/react-hooks'

import { useMainNavigation } from '../../context/navigation'
import { Story } from '../../entities/Story'
import * as flags from '../../utils/flags'
import history from '../../utils/history'
import useOpenStory from '../useOpenStory'

const mockNavigateFn = jest.fn()
const mockPushFn = jest.fn()
const mockRoute = { name: '', params: {} }
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    addListener: jest.fn(),
    navigate: mockNavigateFn,
    push: mockPushFn,
  })),
  useRoute: jest.fn(() => mockRoute),
}))

jest.mock('../../context/navigation')
const mockMainNavigation = useMainNavigation as jest.Mock

beforeEach(() => {
  mockMainNavigation.mockImplementation(() => ({
    categories: [],
  }))
})

afterEach(cleanup)

describe('useOpenStory hook', () => {
  it('should navigate to home screen when story opens', () => {
    const { result } = renderHook(() => useOpenStory('CurrentScreenName'))
    const story: Story = { id: 'nid', url: '/pathname' }
    result.current(story)
    expect(mockNavigateFn).toHaveBeenLastCalledWith('Main', {
      screen: 'Home',
      params: { screen: 'Feed' },
    })
  })

  it('should open story with /news in the pathname when category does not exist', () => {
    const spy = jest.spyOn(history, 'push')
    const { result } = renderHook(() => useOpenStory('CurrentScreenName'))

    const story: Story = { id: 'nid', url: '/pathname' }

    result.current(story)
    expect(spy).toHaveBeenCalledWith('/news/pathname?ref=Screen', {
      pageInfo: {
        screenName: mockRoute.name,
        params: mockRoute.params,
      },
      section: 'CurrentScreenName',
    })
  })

  it('should open story with /category in the pathname when category exists', () => {
    mockMainNavigation.mockImplementation(() => ({
      categories: [{ path: `/category/deporte` }],
    }))

    const spy = jest.spyOn(history, 'push')
    const { result } = renderHook(() => useOpenStory('CurrentScreenName'))

    const story: Story = { id: 'nid', url: '/deporte/pathname' }
    result.current(story)
    expect(spy).toHaveBeenCalledWith('/deporte/pathname?ref=Screen', {
      pageInfo: {
        screenName: mockRoute.name,
        params: mockRoute.params,
      },
      section: 'CurrentScreenName',
    })
  })

  it('should open story once in native screen when enabled', () => {
    Object.defineProperty(flags, 'ENABLE_SCREEN_STORY', { value: true })
    const { result } = renderHook(() => useOpenStory('CurrentScreenName'))
    const story: Story = { id: 'nid', url: '/url/' }
    result.current(story)
    result.current(story)
    expect(mockPushFn).toBeCalledTimes(1)
    expect(mockPushFn).toHaveBeenLastCalledWith('Story', {
      id: 'nid',
      pathname: '/url/',
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id: any = undefined
    result.current({ id, url: '/url-path/' })
    expect(mockPushFn).toBeCalledTimes(2)
  })
})
