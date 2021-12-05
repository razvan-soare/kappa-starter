module.exports = {
  ...require("./test/jest-common"),
  collectCoverageFrom: [
    "**/src/**/*.js",
    "**/src/**/*.jsx",
    "**/src/**/*.ts",
    "**/src/**/*.tsx",
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 15,
      lines: 15,
      statements: 15,
    },
  },
  projects: [
    "./test/jest.client.js",
    "./test/jest.server.js",
  ],
};
