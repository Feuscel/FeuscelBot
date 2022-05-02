const config = require('../../../config.json')
module.exports = {
    name: 'messageCreate',
    once: false,
    execute(client, message) {
        if (message.author.bot || !message.content.startsWith(config.prefix)) return;
        

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const cmdName = args.shift().toLowerCase();
        if(cmdName.length == 0) return;
        let cmd = client.commands.get(cmdName);
        if(!cmd) return message.reply('This command does not exist');
        if(cmd.ownerOnly && message.author.id != message.guild.ownerId) return message.reply('Only owner can type this command');
        if(!message.member.permissions.has([cmd.permissions])) return message.reply(`You don't have the permissions for this ${cmd.name}, you need this permission : ${cmd.permissions.join(', ')}.`);

        if(cmd) cmd.run(client, message, args);
    },
};