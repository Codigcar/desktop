import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
  return {
    preset: 'ts-jest',
    displayName: {
      name: 'matrix-container-customer-cmd-svc',
      color: 'greenBright',
    },
    moduleFileExtensions: [
      "js",
      "json",
      "ts"
    ],
    verbose: true,
    testMatch: ['**/**/*.spec.ts'],
    testEnvironment: 'node',
    detectOpenHandles: true,
    coverageDirectory: './coverage/',
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    forceExit: true,
    coveragePathIgnorePatterns: [
      '/src/shared/response.ts',
      '/test/*',
      '/src/utils/errors.ts'
    ],
    modulePaths: ['<rootDir>'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1'
    },
  };
};
