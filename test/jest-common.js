const path = require("path");

module.exports = {
  "moduleDirectories": [
    "node_modules",
    path.join(__dirname, "../src"),
    "shared",
    path.join(__dirname),
  ],
  moduleNameMapper: {
    "\\.css$": require.resolve("./style-mock.js"),
    "\\.module\\.css$": "identity-obj-proxy",
    "\\.svg$": require.resolve("./jest.svg.jsx"),
  },
  rootDir: path.join(__dirname, ".."),
  watchPlugins: [
    "jest-watch-select-projects",
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
