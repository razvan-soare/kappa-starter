module.exports = {
  ...require("./jest-common"),
  displayName: "server",
  testEnvironment: "jest-environment-node",
  testMatch: [
    "**/__server_tests__/**/*.js",
    "**/__server_tests__/**/*.jsx",
    "**/__server_tests__/**/*.ts",
    "**/__server_tests__/**/*.tsx",
  ],
};
