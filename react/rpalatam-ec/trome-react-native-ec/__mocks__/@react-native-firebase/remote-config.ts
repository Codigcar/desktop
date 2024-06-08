import { AD_NEWS_LIST } from '../../src/utils/constants'

const remoteConfig = (): unknown => ({
  activate: jest.fn().mockResolvedValue(false),
  setDefaults: jest.fn(),
  setConfigSettings: jest.fn().mockResolvedValue(true),
  fetchAndActivate: jest.fn().mockResolvedValue(true),
  getValue: jest.fn((key: string) => ({
    asBoolean: jest.fn(),
    asString: jest.fn(() => {
      if (key === 'ad_news_list') return JSON.stringify(AD_NEWS_LIST)
      return null
    }),
    asNumber: jest.fn(),
    getSource: jest.fn().mockReturnValue('remote'),
  })),
  fetch: jest.fn(),
})

export default remoteConfig
