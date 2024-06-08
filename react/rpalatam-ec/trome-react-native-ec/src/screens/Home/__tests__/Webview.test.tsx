import { Platform } from 'react-native'

import * as inappbrowser from '../../../utils/inappbrowser'
import { getUrl, onShouldLoadRequest } from '../Webview'

const ORIGIN = 'https://elcomercio.pe'

describe('WebViewScene', () => {
  it('webview url cases', () => {
    expect(getUrl('section-key')).toBe(`${ORIGIN}/section-key/`)
    expect(getUrl('portada')).toBe(`${ORIGIN}/`)
    expect(getUrl('ultimo')).toBe(`${ORIGIN}/ultimas-noticias/`)
    expect(getUrl('tecnologia-e-sports')).toBe(`${ORIGIN}/tecnologia/e-sports/`)
  })

  describe('should load request', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const anyFn = (event: any): any => event

    beforeEach(() => {
      jest.spyOn(Platform, 'select').mockReturnValue(true)
    })
    afterEach(() => jest.clearAllMocks())

    it('open external link', () => {
      const navigation = anyFn(jest.fn)
      const openInBrowser = jest.spyOn(inappbrowser, 'openInBrowser')

      const req = anyFn({ url: 'https://domain.com' })
      expect(onShouldLoadRequest(req, navigation)).toBeFalsy()
      expect(openInBrowser).toBeCalledWith(req.url)
    })

    it('not open refresh page or google vignette', () => {
      const navigation = anyFn(jest.fn)
      const openInBrowser = jest.spyOn(inappbrowser, 'openInBrowser')

      const req = anyFn({ url: `${ORIGIN}/pathname/?ref=ecr` })
      expect(onShouldLoadRequest(req, navigation)).toBeFalsy()
      const req2 = anyFn({ url: `${ORIGIN}/pathname/#google_vignette` })
      expect(onShouldLoadRequest(req2, navigation)).toBeFalsy()
      expect(openInBrowser).not.toBeCalled()
    })

    it('navigate to games screen', () => {
      const navigation = anyFn({ navigate: jest.fn() })

      const req = anyFn({ url: `${ORIGIN}/juegos/` })
      expect(onShouldLoadRequest(req, navigation)).toBeFalsy()
      expect(navigation.navigate).toBeCalledWith('Games')
    })

    it('navigate to screen', () => {
      const navigation = anyFn({ push: jest.fn() })

      const req = anyFn({ url: `${ORIGIN}/pathname-noticia/` })
      expect(onShouldLoadRequest(req, navigation)).toBeFalsy()
      expect(navigation.push).toBeCalledWith('Story', {
        pathname: '/pathname-noticia/',
      })
    })
  })
})
