import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  displayName: '@tooli/tooli',
  preset: '../../jest.preset.js',
  moduleNameMapper: {
    '^@tooli/wheel-engine$': '<rootDir>/../../libs/wheel-engine/src/index.ts',
    '^@tooli/user-management$':
      '<rootDir>/../../libs/user-management/src/index.ts',
    '^@tooli/history-tracker$':
      '<rootDir>/../../libs/history-tracker/src/index.ts',
    '^@tooli/audio-system$': '<rootDir>/../../libs/audio-system/src/index.ts',
    '^@tooli/shared-ui$': '<rootDir>/../../libs/shared-ui/src/index.ts',
  },
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/tooli',
  testEnvironment: 'jsdom',
};

export default createJestConfig(config);
