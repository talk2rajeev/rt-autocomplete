module.exports = {
    testMatch: [
        '<rootDir>/src/**/*.test.ts',
        '<rootDir>/src/**/*.test.tsx',
    ],
    "setupFiles": [
        "<rootDir>/src/setupTests.js"
    ],
    "moduleNameMapper": {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
}