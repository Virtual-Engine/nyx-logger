const { styles } = require('./style');
const { writeLogToFile, writeLogToJson, writeLogToFileByType, formatTimestamp } = require('./util');
const { checkForUpdates } = require('./updater');
const { progressBar } = require('./progress_bar');
const path = require('path');
const colors = require('colors');
const moment = require('moment');
const fs = require('fs');

let logFilePath = path.join(__dirname, 'log.txt');

const log = {
        set_file: function(filePath) {
            logFilePath = path.resolve(filePath);
            const dir = path.dirname(logFilePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            if (!fs.existsSync(logFilePath)) {
                fs.writeFileSync(logFilePath, '');
            }
        },

        print: function(style, message, color) {
            const selectedStyle = styles[style] || { logFunction: console.log, prefix: "" };
            const logMessage = `${formatTimestamp()} ${selectedStyle.prefix} ${message}`;
            selectedStyle.logFunction(logMessage);

            writeLogToFile(logMessage.replace(/\x1B\[\d+m/g, ''));
            writeLogToJson(message);
            writeLogToFileByType(style, logMessage.replace(/\x1B\[\d+m/g, ''));

            checkForUpdates();
        },

        custom: function(...args) {
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

                const coloredTag = colors[tagColor] ?
                    (colorBrackets ?
                        `${colors[tagColor](`[${tag}]`)}`
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

    progressBar: function(progress_string = '#', end_string = '>', percentage) {
        const barLength = 50;
        const progress = Math.round((percentage / 100) * barLength);
        let empty = barLength - progress;

        if (empty <= 0) {
            empty = 1;
        }

        const progressString = progress_string.repeat(progress);
        const emptyString = ' '.repeat(empty - 1);

        process.stdout.write(`\r[${progressString}${end_string}${emptyString}] ${percentage}%`);

        if (percentage === 100) {
            process.stdout.write('\n');
        }

        const logMessage = `${formatTimestamp()} [PROGRESS] ${progressString}${end_string}${emptyString} ${percentage}%`;
        writeLogToFile(logMessage.replace(/\x1B\[\d+m/g, ''));
        writeLogToJson(`Progress: ${percentage}%`);
        writeLogToFileByType('progress', logMessage.replace(/\x1B\[\d+m/g, ''));
    }
};

module.exports = log;