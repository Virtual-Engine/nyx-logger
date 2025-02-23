const log = require('./index');

const progressBar = {
    draw: function(progress_string = '#', end_string = '>', percentage) {
        const barLength = 50;
        const progress = Math.round((percentage / 100) * barLength);
        const empty = barLength - progress;
        const progressString = progress_string.repeat(progress);
        const emptyString = ' '.repeat(empty - 1);
        process.stdout.write(`\r[${progressString}${end_string}${emptyString}] ${percentage}%`);
    }
};

module.exports = progressBar;