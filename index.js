const colors = require("colors");
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const semver = require('semver');
const { version: currentVersion } = require('./package.json');

let logFilePath = path.join(__dirname, 'log.txt');

const log = {
    set_file: function (filePath) {
        logFilePath = path.resolve(filePath);
        const dir = path.dirname(logFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(logFilePath)) {
            fs.writeFileSync(logFilePath, '');
        }
    },

    print: function (style, string, color) {
        const styles = {
            info: { prefix: colors.magenta("[INFO]"), logFunction: console.log },
            err: { prefix: colors.red("[ERROR]"), logFunction: console.error },
            warn: { prefix: colors.yellow("[WARNING]"), logFunction: console.warn },
            done: { prefix: colors.blue("[SUCCESS]"), logFunction: console.log },
            dev: { prefix: colors.grey("[DEV]"), logFunction: console.log },
            asci: { logFunction: console.log },
        };

        const selectedStyle = styles[style] || { logFunction: console.log, prefix: "" };

        if (style === 'asci') {
            const coloredString = color && colors[color] ? colors[color](string) : string;
            selectedStyle.logFunction(coloredString);
        } else {
            selectedStyle.logFunction(`[${moment().format("HH:mm:ss:SSS YYYY-MM-DD")}] ${selectedStyle.prefix} ${string}`);
        }

        const logMessage = style === 'asci'
            ? `${string}\n`
            : `[${moment().format("HH:mm:ss:SSS YYYY-MM-DD")}] ${selectedStyle.prefix.replace(/(\u001b\[.*?m)/g, '')} ${string}\n`;

        fs.appendFile(logFilePath, logMessage, (err) => {
            if (err) {
                console.error('failed to write log:', err);
            }
        });
    },

    custom: function (...args) {
        let tag = 'LOG';
        let message = '';
        let tagColor = 'white';
        let colorBrackets = false;
        let includeTimestamp = true;
        let includeDate = true;
        let includeTime = true;

        if (args.length === 1 && typeof args[0] === 'object') {
            const options = args[0];
            tag = options.tag || tag;
            message = options.message || message;
            tagColor = options.tagColor || tagColor;
            colorBrackets = options.colorBrackets !== undefined ? options.colorBrackets : colorBrackets;
            includeTimestamp = options.includeTimestamp !== undefined ? options.includeTimestamp : includeTimestamp;
            includeDate = options.includeDate !== undefined ? options.includeDate : includeDate;
            includeTime = options.includeTime !== undefined ? options.includeTime : includeTime;
        } else {
            tag = args[0] || tag;
            message = args[1] || message;
            tagColor = args[2] || tagColor;
            colorBrackets = args[3] !== undefined ? args[3] : colorBrackets;
            includeTimestamp = args[4] !== undefined ? args[4] : includeTimestamp;
            includeDate = args[5] !== undefined ? args[5] : includeDate;
            includeTime = args[6] !== undefined ? args[6] : includeTime;
        }

        const coloredTag = colors[tagColor]
            ? (colorBrackets
                ? `${colors[tagColor](`[${tag}]`)}`
                : `[${colors[tagColor](tag)}]`)
            : `[${tag}]`;

        let timestamp = '';
        if (includeTimestamp) {
            let format = '';
            if (includeTime) format += 'HH:mm:ss:SSS';
            if (includeDate) format += ' YYYY-MM-DD';
            timestamp = `[${moment().format(format)}] `;
        }

        const fullMessage = `${timestamp}${coloredTag} ${message}`;
        console.log(fullMessage);

        const logMessageForFile = `${timestamp.replace(/(\u001b\[.*?m)/g, '')}${coloredTag.replace(/(\u001b\[.*?m)/g, '')} ${message}\n`;
        fs.appendFile(logFilePath, logMessageForFile, (err) => {
            if (err) {
                console.error('Failed to write log:', err);
            }
        });
    },

    progressBar: function (progress_string, end_string, percentage) {
        const barLength = 50;
        const progress = Math.round((percentage / 100) * barLength);
        const empty = barLength - progress;

        const progressString = progress_string.repeat(progress);
        const emptyString = empty > 1 ? " ".repeat(empty - 1) : "";
        const endString = end_string;

        process.stdout.write(`\r[${progressString}${endString}${emptyString}] ${percentage}%`);
    },

    checkForUpdates: async function () {
        const response = await axios.get(`https://registry.npmjs.org/nyx-logger`);

        if (response.data && response.data['dist-tags'] && response.data['dist-tags'].latest) {
            const latestVersion = response.data['dist-tags'].latest;

            if (semver.gt(latestVersion, currentVersion)) {
                const currentMajor = semver.major(currentVersion);
                const latestMajor = semver.major(latestVersion);

                if (latestMajor > currentMajor + 1) {
                    this.print("info", `[nyx-logger] Major update available! Current version: ${currentVersion}, Latest version: ${latestVersion}. Run: npm i nyx-logger@latest`);
                } else if (latestMajor > currentMajor) {
                    this.print("info", `[nyx-logger] Major version update detected: ${currentVersion} → ${latestVersion}. Consider updating with: npm i nyx-logger@latest`);
                } else {
                    this.print("info", `[nyx-logger] Update available: ${currentVersion} → ${latestVersion}. Run: npm i nyx-logger@latest`);
                }
            }
        } else {
            this.print("err", "Unexpected response structure from NPM registry:", response.data);
        }
    }
}

log.checkForUpdates();

module.exports = {
    log,
};