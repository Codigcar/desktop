/* eslint-disable @typescript-eslint/no-var-requires */
const mockProduction = { APP_ENVIRONMENT: 'production' }
const mockStaging = { APP_ENVIRONMENT: 'staging' }

describe('config', () => {
  beforeEach(jest.resetModules)

  it('unknown bundle id', async () => {
    jest.mock('react-native-device-info', () => ({
      getBundleId: jest.fn(() => 'com.eeec.unknown'),
    }))
    const mockRecordError = jest.fn()
    jest.mock('@react-native-firebase/crashlytics', () => {
      return () => ({ recordError: mockRecordError })
    })
    expect(() => require('../config')).toThrowError()
    expect(mockRecordError).toBeCalled()
  })

  it('app select', () => {
    jest.mock('react-native-device-info', () => ({
      getBundleId: jest.fn(() => 'com.gec.elcomercio'),
    }))
    const { App } = require('../config')
    expect(App.select({})).toBeUndefined()
    expect(App.select({ default: 'value' })).toBe('value')
    expect(App.select({ elcomercio: 'ec', default: 'value' })).toBe('ec')
  })

  describe('Depor', () => {
    beforeAll(() => {
      jest.mock('react-native-device-info', () => ({
        getBundleId: jest.fn(() => 'com.eeec.Depor'),
      }))
    })

    it('staging', () => {
      jest.mock('react-native-config', () => mockStaging)
      const { webviewUrl } = require('../config')
      expect(webviewUrl).toBe('https://pwa.dev.depor.com')
    })

    it('production', () => {
      jest.mock('react-native-config', () => mockProduction)
      const config = require('../config')
      expect(config.App.key).toBe('depor')
      expect(config.webviewUrl).toBe('https://pwa.depor.com')
    })
  })

  describe('El Comercio', () => {
    beforeAll(() => {
      jest.mock('react-native-device-info', () => ({
        getBundleId: jest.fn(() => 'com.gec.elcomercio'),
      }))
    })

    it('staging', () => {
      jest.mock('react-native-config', () => mockStaging)
      const { webviewUrl } = require('../config')
      expect(webviewUrl).toBe('https://pwa.dev.elcomercio.pe')
    })

    it('production', () => {
      jest.mock('react-native-config', () => mockProduction)
      const config = require('../config')
      expect(config.App.key).toBe('elcomercio')
      expect(config.webviewUrl).toBe('https://pwa.elcomercio.pe')
    })
  })

  describe('Gestión', () => {
    beforeAll(() => {
      jest.mock('react-native-device-info', () => ({
        getBundleId: jest.fn(() => 'com.eeec.Gestion'),
      }))
    })

    it('staging', () => {
      jest.mock('react-native-config', () => mockStaging)
      const { webviewUrl } = require('../config')
      expect(webviewUrl).toBe('https://pwa.dev.gestion.pe')
    })

    it('production', () => {
      jest.mock('react-native-config', () => mockProduction)
      const config = require('../config')
      expect(config.App.key).toBe('gestion')
      expect(config.webviewUrl).toBe('https://pwa.gestion.pe')
    })
  })

  describe('Perú21', () => {
    beforeAll(() => {
      jest.mock('react-native-device-info', () => ({
        getBundleId: jest.fn(() => 'com.eeec.Peru21'),
      }))
    })

    it('staging', () => {
      jest.mock('react-native-config', () => mockStaging)
      const { webviewUrl } = require('../config')
      expect(webviewUrl).toBe('https://pwa.dev.peru21.pe')
    })

    it('production', () => {
      jest.mock('react-native-config', () => mockProduction)
      const config = require('../config')
      expect(config.App.key).toBe('peru21')
      expect(config.webviewUrl).toBe('https://pwa.peru21.pe')
    })
  })

  describe('Trome', () => {
    beforeAll(() => {
      jest.mock('react-native-device-info', () => ({
        getBundleId: jest.fn(() => 'com.eeec.Trome'),
      }))
    })

    it('staging', () => {
      jest.mock('react-native-config', () => mockStaging)
      const { webviewUrl } = require('../config')
      expect(webviewUrl).toBe('https://pwa.dev.trome.pe')
    })

    it('production', () => {
      jest.mock('react-native-config', () => mockProduction)
      const config = require('../config')
      expect(config.App.key).toBe('trome')
      expect(config.webviewUrl).toBe('https://pwa.trome.pe')
    })
  })
})

export {}
