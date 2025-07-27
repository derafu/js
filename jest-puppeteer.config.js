module.exports = {
    launch: {
        headless: 'new',
        slowMo: 100,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--no-first-run',
            '--disable-gpu'
        ]
    }
};
