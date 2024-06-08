import React from 'react'

export const Banner = 'Banner'
export const Interstitial = {
  requestAd: jest.fn(() => Promise.resolve()),
  setAdUnitID: jest.fn(),
  showAd: jest.fn(() => Promise.resolve()),
}
export const NativeAdsManager = jest.fn()
export const TriggerableView = 'TriggerableView'
export const withNativeAd = jest.fn().mockImplementation(
  (Component) => () =>
    React.createElement(Component, {
      nativeAd: { type: 'native', headline: 'Headline' },
    }),
)
