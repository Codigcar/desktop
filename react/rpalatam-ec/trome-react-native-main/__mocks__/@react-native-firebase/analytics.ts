// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default () => ({
  logEvent: jest.fn(),
  logSearch: jest.fn(),
  logScreenView: jest.fn(),
  logSignUp: jest.fn(),
  logLogin: jest.fn(),
  logViewSearchResults: jest.fn(),
  setUserId: jest.fn(),
  setUserProperty: jest.fn(),
})
