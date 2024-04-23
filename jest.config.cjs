/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  clearMocks: true,
  coverageThreshold: {
    global: {
      branches: 98,
      functions: 100,
      lines: 100,
      statements: 99,
    },
  },
  transform: {
    "^.+\\.svg$": "<rootDir>/.jest/file-transformer.js",
  },
  // https://stackoverflow.com/a/76818962/2887392
  prettierPath: require.resolve("prettier-2"),
};
