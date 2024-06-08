const InAppBrowserClassMethods = {
  isAvailable: jest.fn().mockResolvedValue(true),
  open: jest.fn(),
  openAuth: jest.fn((url, redirect_url) => {
    const [state] = url.match(/state=\w+/i)
    return Promise.resolve({
      type: 'success',
      url: `${decodeURIComponent(redirect_url)}?code=abc123&${state}`,
    })
  }),
}

export const InAppBrowser = InAppBrowserClassMethods
export default InAppBrowserClassMethods
