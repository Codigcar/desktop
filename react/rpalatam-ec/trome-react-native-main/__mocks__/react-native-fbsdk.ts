module.exports = {
  AccessToken: {
    getCurrentAccessToken: jest.fn(() =>
      Promise.resolve({
        accessToken: '',
      }),
    ),
  },
  LoginManager: {
    logInWithPermissions: jest.fn(() => Promise.resolve({})),
    logOut: jest.fn(),
  },
  GraphRequest: jest.fn((_, config, callback) => {
    callback(null, { email: 'mock-email' })
  }),
}
