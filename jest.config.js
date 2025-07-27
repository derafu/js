module.exports = {
    preset: 'jest-puppeteer',
    setupFiles: ['./jest.setup.js'],
    testTimeout: 30000, // 30 seconds
    testMatch: ['<rootDir>/tests/**/*.test.js']
};
