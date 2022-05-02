module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if(interaction.isCommand() || interaction.isContextMenu()){
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd) return interaction.reply('This command does not exist');
            if(cmd.ownerOnly && message.author.id != message.guild.ownerId) return interaction.reply('Only owner can type this command');
            if(!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({  content: `You don't have the permissions for this ${cmd.name}, you need this permission : ${cmd.permissions.join(', ')}.`, ephemeral: true });
            cmd.runInteraction(client, interaction)
        }
    }
};