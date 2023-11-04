import type {Config} from 'jest';
import {defaults} from 'jest-config';
const config: Config = {
    verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ['<rootDir>/setup-test.js'],
    collectCoverageFrom: [
      "<rootDir>/src/**/*.{js,ts,jsx,tsx}",
      "!<rootDir>/**/*Type.{js,ts,jsx,tsx}",
      "!<rootDir>/**/*.styled.{js,ts,jsx,tsx}",
      "!<rootDir>/**/icons/**",
      "!<rootDir>/**/App.tsx",
      "!<rootDir>/**/main.tsx",
      "!<rootDir>/**/vite-env.d.ts",
      "!<rootDir>/**/index.ts",
      "!<rootDir>/**/*.enum.{js,ts,jsx,tsx}"
  ],
  transformIgnorePatterns: ['/node_modules/(?!(foo|bar)/)', '/bar/'],
     moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/.jest/mocks/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },

};
export default config;