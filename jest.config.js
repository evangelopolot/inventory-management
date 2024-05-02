module.exports = {
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.js?(x)", "**/?(*.)+(spec|test).js?(x)"],
  moduleFileExtensions: ["js", "json", "node"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js"],
  //   globalSetup: "./jest.setup.js",
  //   globalTeardown: "./jest.teardown.js",
  preset: "@shelf/jest-mongodb",
};
