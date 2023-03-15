/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  clearMocks: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 97,
      lines: 100,
      statements: 99,
    },
  },
  transform: {
    "^.+\\.svg$": "<rootDir>/.jest/file-transformer.js",
  },
};
