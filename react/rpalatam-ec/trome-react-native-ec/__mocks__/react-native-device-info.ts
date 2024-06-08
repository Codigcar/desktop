module.exports = {
  getApplicationName: jest.fn(() => 'El Comercio'),
  getBuildNumber: jest.fn(() => '50'),
  getBundleId: jest.fn(() => 'com.gec.elcomercio'),
  getReadableVersion: jest.fn(() => '10.5.50'),
  getUserAgent: jest.fn(() => 'someAgent'),
}
