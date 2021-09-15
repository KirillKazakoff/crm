module.exports = {
    verbose: false,
    projects: [
        // {
        //     displayName: 'e2eSrver',
        //     // testEnvironment: 'jsDom',
        //     testMatch: ['**/tests/e2eServer/*.test.js'],
        // },
        {
            displayName: 'e2e',
            preset: 'jest-puppeteer',
            globals: {
                URL: 'http://localhost:9002/dist',
            },
            testMatch: ['**/tests/e2e/*.js'],
        },
        {
            displayName: 'unit',
            testMatch: ['**/tests/unit/*.test.js'],
        },
    ],
};
