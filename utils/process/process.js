module.exports = {
    createEventProcess: () => {
        process.on('exit', code => {console.log(`Process end up with code : ${code}`)});
        process.on('uncaughtException', (err, origin) => {console.log(`UNCAUGHT_EXCEPTION: ${err}`, `Origin: ${origin}`)});
        process.on('unhandledRejection', (reason, promise) => {console.log(`UNHANDLED_REJECTION: ${reason}`, `Promise: ${promise}`)});
        process.on('warning', (...args) => {console.log(`WARNING: ${args}`)});
        console.log('Process event create')
    }
}