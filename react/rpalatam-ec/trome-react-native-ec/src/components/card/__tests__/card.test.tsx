import '@testing-library/jest-native/extend-expect'
import { cleanup } from '@testing-library/react-hooks'
import { act, fireEvent, render } from '@testing-utils/library'
import React from 'react'
import { Platform, Share, StyleProp, ViewStyle } from 'react-native'

import { useAuth } from '../../../context/auth'
import { FavoritesProvider } from '../../../context/favorites'
import { NotificationProvider } from '../../../context/notification'
import { Story } from '../../../entities/Story'
import { App } from '../../../utils/config'
import CardAction from '../CardActions'
import CardFooter from '../CardFooter'
import CardHeader from '../CardHeader'
import CardMedia, { getMediaIcon } from '../CardMedia'
import CardPlaceholder from '../CardPlaceholder'
import Card from '../card'

App.key = 'gestion'
const story: Story = {
  id: 'testnid',
  last_updated_date: '12-12-2021',
  headline: 'test-Title',
  url: '/test-url',
}

const mockNavigateFn = jest.fn()
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({
    navigate: mockNavigateFn,
  })),
}))

jest.mock('../../../context/auth')
const mockUseAuth = useAuth as jest.Mock

beforeEach(() => {
  mockUseAuth.mockImplementation(() => ({ user: {} }))
})

afterAll(cleanup)

describe('card component', () => {
  it('should render card media component with wrapper styles', () => {
    const styles: StyleProp<ViewStyle> = { aspectRatio: 4 / 3 }
    const { getByTestId } = render(
      <CardMedia uri="/uri" wrapperStyle={styles} />,
    )

    const cardMedia = getByTestId('card-media')
    expect(cardMedia).toHaveStyle(styles)
  })

  it('should render an icon and title', () => {
    const { getByText, getByTestId } = render(
      <CardMedia icon={{ name: 'name', title: 'title' }} uri="/uri" />,
    )

    const icon = getByTestId('card-media-icon')
    expect(icon?.findByProps({ name: 'name' })).toBeDefined()
    expect(getByText('title')).toBeDefined()
  })

  it('should return an icon name and title for the gallery and video', () => {
    const gallery = getMediaIcon('gallery')
    expect(gallery).toMatchObject({
      name: 'checkbox-multiple-blank',
      title: 'FOTOS',
    })

    const video = getMediaIcon('video')
    expect(video).toMatchObject({ name: 'play', title: 'VIDEO' })
  })

  it('should share headline and url when story is shared', async () => {
    const spy = jest.spyOn(Share, 'share')
    const { getByTestId } = render(
      <FavoritesProvider>
        <CardAction {...story} />
      </FavoritesProvider>,
    )
    await act(async () => undefined)

    fireEvent.press(getByTestId('card-share-button'))
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining(
        Platform.select({
          ios: { url: expect.stringContaining(`${story.url}`) },
          default: { message: expect.stringContaining(`${story.url}`) },
        }),
      ),
      { dialogTitle: 'Compartir' },
    )
  })

  it('should change styles when favorite is active', async () => {
    const { getByTestId } = render(
      <FavoritesProvider>
        <CardAction {...story} />
      </FavoritesProvider>,
    )
    await act(async () => undefined)

    const icon = { name: 'bookmark' }
    const button = getByTestId('card-save-button')
    const initialProps = button.findByProps(icon).props

    fireEvent.press(button)
    await act(async () => undefined)
    const nextProps = button.findByProps(icon).props
    expect(nextProps).not.toMatchObject(initialProps)

    fireEvent.press(button)
    await act(async () => undefined)
    expect(button.findByProps(icon).props).toMatchObject(initialProps)
  })

  it('should navigate to read later screen when the story is added to favorite', async () => {
    const { getByTestId, getByText } = render(
      <NotificationProvider>
        <FavoritesProvider>
          <CardAction {...story} />
        </FavoritesProvider>
      </NotificationProvider>,
    )
    await act(async () => undefined)

    fireEvent.press(getByTestId('card-save-button'))
    await act(async () => undefined)

    fireEvent.press(getByText('Ir a leer luego'))
    expect(mockNavigateFn).toHaveBeenLastCalledWith('Main', {
      screen: 'Favorite',
    })
  })

  it('should navigate to section screen', () => {
    const section = { name: 'Perú', path: '/url' }
    const { getByText } = render(<CardHeader id="id" section={section} />)

    fireEvent.press(getByText('Perú'))
    expect(mockNavigateFn).toHaveBeenLastCalledWith('Main', {
      screen: 'News',
      params: section,
    })
  })

  it('should render badge when story is premium', async () => {
    App.key = 'elcomercio'
    const { getByText, rerender } = render(
      <FavoritesProvider>
        <CardFooter id="id" restrictions="premium" />
      </FavoritesProvider>,
    )
    await act(async () => undefined)

    expect(getByText(/suscriptor digital/i)).toBeDefined()

    App.key = 'gestion'
    rerender(
      <FavoritesProvider>
        <CardFooter id="id" restrictions="premium" />
      </FavoritesProvider>,
    )
    await act(async () => undefined)

    expect(getByText(/plus/i)).toBeDefined()
  })

  it('should render reading time', async () => {
    const { getByText } = render(
      <FavoritesProvider>
        <CardFooter id="id" restrictions="premium" reading_time={2} />
      </FavoritesProvider>,
    )
    await act(async () => undefined)

    expect(getByText(/2 min de lectura/i)).toBeDefined()
  })

  it('should render the default card when the variant is not defined', async () => {
    const fn = jest.fn()
    const { getByTestId } = render(
      <FavoritesProvider>
        <Card story={story} onPress={fn} />
      </FavoritesProvider>,
    )
    await act(async () => undefined)

    fireEvent.press(getByTestId('card-action-area'))
    expect(fn).toHaveBeenCalled()
  })

  it('should render the magazine card when the variant is defined', async () => {
    const fn = jest.fn()
    const { getByTestId } = render(
      <FavoritesProvider>
        <Card story={story} onPress={fn} variant="magazine" />
      </FavoritesProvider>,
    )
    await act(async () => undefined)

    fireEvent.press(getByTestId('card-action-area'))
    expect(fn).toHaveBeenCalled()
  })

  it('should not render description when the density is compact', async () => {
    const storyProp: Story = { ...story, subheadline: 'subtitle' }
    const { queryByText } = render(
      <FavoritesProvider>
        <Card story={storyProp} onPress={jest.fn} density="compact" />
      </FavoritesProvider>,
    )
    await act(async () => undefined)
    expect(queryByText('subtitle')).toBeNull()
  })

  it('should render description when the density is comfortable', async () => {
    const storyProp: Story = { ...story, subheadline: 'subtitle' }
    const { getByText } = render(
      <FavoritesProvider>
        <Card story={storyProp} onPress={jest.fn} density="comfortable" />
      </FavoritesProvider>,
    )
    await act(async () => undefined)
    expect(getByText('subtitle')).toBeDefined()
  })

  it('should render card placeholder', () => {
    const { getAllByTestId, rerender } = render(<CardPlaceholder />)

    expect(getAllByTestId('card-placeholder').length).toBe(1)

    const repeat = 2
    rerender(<CardPlaceholder repeat={repeat} variant="magazine" />)
    expect(getAllByTestId('card-placeholder').length).toBe(repeat)
  })
})
