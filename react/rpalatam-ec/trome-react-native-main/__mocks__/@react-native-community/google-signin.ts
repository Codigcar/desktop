const GoogleSignin = {
  configure: jest.fn(),
  hasPlayServices: jest.fn(() => Promise.resolve(true)),
  revokeAccess: jest.fn(() => Promise.resolve(null)),
  signIn: jest.fn(() =>
    Promise.resolve({
      idToken: 'token',
    }),
  ),
  signOut: jest.fn(() => Promise.resolve(null)),
}

export { GoogleSignin }
