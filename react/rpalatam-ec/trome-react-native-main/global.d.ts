/* eslint-disable import/order */
/* eslint-disable import/no-duplicates */
declare namespace NodeJS {
  interface Global {
    HermesInternal: string
  }
}

declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

declare module 'react-native-ad-manager' {
  import React from 'react'
  import { ViewProps } from 'react-native'
  type AdEvents = {
    onAdClosed?: (event: unknown) => void
    onAdFailedToLoad?: (event: Error) => void
    onAdLeftApplication?: (event: unknown) => void
    onAdLoaded?: (event: unknown) => void
    onAdOpened?: (event: unknown) => void
  }
  export type BannerProps = AdEvents &
    ViewProps & {
      adUnitID: string
      adSize?: string
      onAppEvent?: (event: unknown) => void
      testDevices?: string[]
      validAdSizes?: string[]
    }
  export type NativeAdProps = BannerProps
  type Event =
    | 'adClosed'
    | 'adFailedToLoad'
    | 'adLeftApplication'
    | 'adLoaded'
    | 'adOpened'
  export const Banner: React.FC<BannerProps>
  export const Interstitial: {
    addEventListener: (event: Event, callback: () => void) => void
    requestAd: () => Promise<void>
    removeAllListeners: () => void
    setAdUnitID: (adUnitID: string) => void
    setTestDevices: (devices?: string[]) => void
    showAd: () => Promise<void>
  }
  export class NativeAdsManager {
    constructor(adUnitID: string, testId: string[])
  }
  export const TriggerableView: React.FC<ViewProps>
  export const withNativeAd: <C>(Component: C) => React.FC
}

declare module 'react-native-randombytes' {
  export const randomBytes: (
    size: number,
    callback?: (err: Error, buf: Buffer) => void,
  ) => Buffer
}
