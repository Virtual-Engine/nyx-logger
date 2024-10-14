const axios = require('axios');
const { version: currentVersion } = require('./package.json');
const log = require("./index")

async function checkForUpdates() {
    const response = await axios.get(`https://registry.npmjs.org/nyx-logger`);
    const latestVersion = response.data['dist-tags'].latest;

    if (latestVersion !== currentVersion) {
        console.log(`[nyx-logger] Update available ${currentVersion} → ${latestVersion}`);
    }
}


module.exports = checkForUpdates;