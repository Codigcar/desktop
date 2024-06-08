import { act, cleanup, render } from '@testing-utils/library'
import React from 'react'

import { NativeAdContent } from '../Native'
import { Banner, NativeAd } from '../index'

afterEach(cleanup)

describe('Ad', () => {
  it('should load the Banner with styles', () => {
    const adLoadedStyle = { backgroundColor: 'red' }
    const { getByTestId } = render(
      <Banner adUnitID="id" testID="adBanner" adLoadedStyle={adLoadedStyle} />,
    )
    const banner = getByTestId('adBanner')
    expect(banner).toHaveProp('adUnitID', '/6499/example/banner')

    act(banner.props.onAdLoaded)
    expect(banner.parent?.parent).toHaveStyle(adLoadedStyle)
  })

  describe('Native', () => {
    it('return null when nativeAd prop does not defined', () => {
      const { queryByTestId } = render(<NativeAdContent />)
      expect(queryByTestId('adNative')).toBeNull()
    })

    it('return null when type is diferent to native', () => {
      const { queryByTestId } = render(
        <NativeAdContent nativeAd={{ type: 'template' }} />,
      )
      expect(queryByTestId('adNative')).toBeNull()
    })

    it('render native ad', () => {
      const { getByText } = render(<NativeAd adUnitID="id" />)
      expect(getByText('Ad')).toBeDefined()
      expect(getByText('Headline')).toBeDefined()

      const view = render(
        <NativeAdContent
          nativeAd={{
            type: 'native',
            bodyText: 'Body',
            images: [{ uri: 'url' }],
          }}
        />,
      )
      expect(view.getByText('Body')).toBeDefined()
    })
  })
})
