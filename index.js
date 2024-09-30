const colors = require("colors");
const moment = require('moment');
const fs = require('fs');
const path = require('path');

let logFilePath = path.join(__dirname, 'logs', 'log.txt');

const logfile = {
    set_log_file: (filePath) => {
        logFilePath = filePath;
        const dir = path.dirname(logFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
    },
}

const log = (style, string) => {
    const styles = {
        info: { prefix: colors.magenta("[INFO]"), logFunction: console.log },
        err: { prefix: colors.red("[ERROR]"), logFunction: console.error },
        warn: { prefix: colors.yellow("[WARNING]"), logFunction: console.warn },
        done: { prefix: colors.blue("[SUCCESS]"), logFunction: console.log },
        dev: { prefix: colors.grey("[DEV]"), logFunction: console.log },
    };

    const selectedStyle = styles[style] || { logFunction: console.log, prefix: "" };

    selectedStyle.logFunction(`[${moment().format("HH:mm:ss:SSS YYYY-MM-DD")}] ${selectedStyle.prefix} ${string}`);

    const logMessage = `[${moment().format("HH:mm:ss:SSS YYYY-MM-DD")}] ${selectedStyle.prefix.replace(/(\u001b\[.*?m)/g, '')} ${string}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('failed to write log:', err);
        }
    });
};

const time = (time, style) => {
    return `<t:${Math.floor(time / 1000)}${style ? `:${style}` : ""}>`;
};

const isSnowflake = (id) => {
    return /^\d+$/.test(id);
};

module.exports = {
    log,
    logfile,
    time,
    isSnowflake
};
