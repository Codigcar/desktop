module.exports = {
  preset: 'react-native',
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageReporters: ['clover', 'cobertura', 'json', 'lcov', 'text'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/__tests__/setupTests.ts',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testMatch: ['<rootDir>/**/*.test.ts?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/__tests__/setupTests.ts',
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    './node_modules/(?!(@?react-native.*|@?react-navigation.*|@invertase/react-native-apple-authentication.*)/)',
  ],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.ts',
    '@testing-utils/(.*)': '<rootDir>/__tests__/utils/$1',
  },
}
