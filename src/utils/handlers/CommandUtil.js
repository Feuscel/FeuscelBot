const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd()}/src/commands/*/*.js`)).map(async (cmdFile) => {
        const cmd = require(cmdFile);
        if (!cmd.name || (!cmd.description && cmd.type != 'USER')) return console.log(`----------------------------------------------------------------\nCommand not triggered : Don't have name or/and description\nIn file -> ${cmdFile}\n----------------------------------------------------------------`)
        client.commands.set(cmd.name, cmd)
        console.log(`Command charged : ${cmd.name}`);
    })
}