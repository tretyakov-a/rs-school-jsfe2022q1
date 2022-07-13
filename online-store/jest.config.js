module.exports = {
  moduleNameMapper: {
    "^@common/(.*)$": "<rootDir>/src/common/$1",
    "^@views/(.*)$": "<rootDir>/src/views/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@assets/(.*)$": "<rootDir>/assets/$1",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/file-mock.js",
    "\\.(scss)$": "identity-obj-proxy"
  }
}