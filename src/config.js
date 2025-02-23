const path = require('path');
const fs = require('fs');

const logFilePath = path.join(__dirname, 'logs', 'app.log');

const ensureLogFile = () => {
    const logDir = path.dirname(logFilePath);
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
    if (!fs.existsSync(logFilePath)) fs.writeFileSync(logFilePath, '');
};

ensureLogFile();

module.exports = { logFilePath }