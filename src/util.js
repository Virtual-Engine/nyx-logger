const fs = require('fs');
const moment = require('moment');
const { logFilePath } = require('./config');
const path = require('path');

const MAX_LOG_SIZE = 5 * 1024 * 1024; // 5MB

const rotateLogFile = () => {
    const stats = fs.statSync(logFilePath);
    if (stats.size > MAX_LOG_SIZE) {
        const timestamp = moment().format('YYYY-MM-DD_HH-mm-ss');
        const newLogPath = path.join(__dirname, 'logs', `app_${timestamp}.log`);
        fs.renameSync(logFilePath, newLogPath);
        fs.writeFileSync(logFilePath, '');
    }
};

const formatTimestamp = () => `[${moment().format("HH:mm:ss:SSS YYYY-MM-DD")}]`;

const writeLogToFile = (message) => {
    rotateLogFile();
    fs.appendFile(logFilePath, message + '\n', (err) => {
        if (err) console.error('Failed to write log:', err);
    });
};

const writeLogToJson = (message) => {
    const logObject = {
        timestamp: moment().format('YYYY-MM-DD HH:mm:ss.SSS'),
        message: message,
    };

    const logJsonFilePath = path.join(__dirname, 'logs', 'log.json');
    fs.appendFile(logJsonFilePath, JSON.stringify(logObject) + ',\n', (err) => {
        if (err) console.error('Failed to write log in JSON:', err);
    });
};

const writeLogToFileByType = (type, message) => {
    const logDir = path.dirname(logFilePath);
    const filePath = path.join(logDir, `${type}_logs.log`);
    fs.appendFile(filePath, message + '\n', (err) => {
        if (err) console.error('Failed to write log:', err);
    });
};

module.exports = { writeLogToFile, writeLogToJson, writeLogToFileByType, formatTimestamp };