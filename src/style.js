const colors = require('colors');

const styles = {
    info: { prefix: colors.magenta("[INFO]"), logFunction: console.log },
    err: { prefix: colors.red("[ERROR]"), logFunction: console.error },
    warn: { prefix: colors.yellow("[WARNING]"), logFunction: console.warn },
    done: { prefix: colors.blue("[SUCCESS]"), logFunction: console.log },
    dev: { prefix: colors.grey("[DEV]"), logFunction: console.log },
    asci: { logFunction: console.log },
    trace: { prefix: colors.cyan("[TRACE]"), logFunction: console.log },
    debug: { prefix: colors.green("[DEBUG]"), logFunction: console.log },
    fatal: { prefix: colors.bgRed("[FATAL]"), logFunction: console.error },
};

module.exports = { styles };