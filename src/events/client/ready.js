const Logger = require('../../utils/Logger')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const devGuild = await client.guilds.cache.get('541713920591921174');
        devGuild.commands.set(client.commands.map(cmd => cmd));
        Logger.client(`- ${client.user.tag} is ready`);
        
    }
};