module.exports = {
    launch: {
        headless: process.env.HEADLESS !== 'false',
        // slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
        // devtools: true,
    },
    server: {
        command: 'yarn start --port 9002',
        port: 9002,
    },
};
