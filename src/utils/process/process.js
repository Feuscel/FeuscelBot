const Logger = require('../Logger')

module.exports = {
    createEventProcess: () => {
        process.on('exit', code => {Logger.error(`Process end up with code : ${code}`)});
        process.on('uncaughtException', (err, origin) => {
            Logger.warn(`UNCAUGHT_EXCEPTION: ${err}`);
            console.log(`Origin: ${origin}`);
        });
        process.on('unhandledRejection', (reason, promise) => {
            Logger.warn(`UNHANDLED_REJECTION: ${reason}`);
            console.log(`Promise: ${promise}`);
        });
        process.on('warning', (...args) => {
            Logger.warn(`WARNING: ${args}`)
        });
        Logger.client('Process event create')
    }
}