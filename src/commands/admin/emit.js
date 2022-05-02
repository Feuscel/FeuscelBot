module.exports = {
    name: 'emit',
    description: 'Emmit event',
    category: 'admin',
    permissions:['ADMINISTRATOR'],
    ownerOnly: false,
    usage:"emit [eventName]",
    examples:['emit guildMemberAdd', 'emit guildMemberRemove'],
    options: [
        {
            name: 'event',
            description: 'Choose event to emit',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd',
                },
                {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove',
                }
            ]
        }
    ],
    run(client, message, args) {
        if(!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove)$/)) return message.reply('Not a valid event (\`guildMemberAdd\`/\`guildMemberRemove\`)');
        client.emit(args[0], message.member);
        message.reply(`Emit ${args[0]} event`)
    },
    
    runInteraction(client, interaction) {
        const evtChoice = interaction.options.getString('event');
        client.emit(evtChoice, interaction.member);
        interaction.reply({ content: `Emit ${evtChoice} event `, ephemeral: true });
    }
};