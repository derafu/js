module.exports = {
    launch: {
        headless: 'new',
        slowMo: 100,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--no-first-run',
            '--disable-gpu'
        ]
    }
};
