export default {
  addEventListener: jest.fn(),
  addDeviceOrientationListener: jest.fn(),
  getAutoRotateState: jest.fn((callback) => callback(true)),
  getInitialOrientation: jest.fn(),
  removeEventListener: jest.fn(),
  lockToPortrait: jest.fn(),
  lockToLandscapeRight: jest.fn(),
  lockToLandscapeLeft: jest.fn(),
  removeDeviceOrientationListener: jest.fn(),
  unlockAllOrientations: jest.fn(),
}
