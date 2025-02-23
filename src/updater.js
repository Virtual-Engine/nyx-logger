const axios = require('axios');
const semver = require('semver');
const { version: currentVersion } = require('../package.json');
const log = require('./index');

const checkForUpdates = async() => {
    try {
        const response = await axios.get(`https://registry.npmjs.org/nyx-logger`);
        const latestVersion = response.data['dist-tags'].latest;

        if (semver.gt(latestVersion, currentVersion)) {
            const majorUpdate = semver.major(latestVersion) > semver.major(currentVersion) + 1;
            const updateMessage = majorUpdate ?
                `[nyx-logger] MAJOR update available! ${currentVersion} → ${latestVersion}. Run: npm i nyx-logger@latest` :
                `[nyx-logger] Update available: ${currentVersion} → ${latestVersion}. Run: npm i nyx-logger@latest`;

            log.print('info', updateMessage);
        }
    } catch (error) {
        log.print('err', 'Failed to check for updates.');
    }
};

module.exports = { checkForUpdates };