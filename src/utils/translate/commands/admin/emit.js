module.exports = {
    name: 'emit',
    description: 'Emmit event',
    run(client, message, args) {
        if(!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove)$/)) return message.reply('Not a valid event (\`guildMemberAdd\`/\`guildMemberRemove\`)');
        client.emit(args[0], message.member);
        message.reply(`Emit ${args[0]} event`)
    },
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
    runInteraction(client, interaction) {
        const evtChoice = interaction.options.getString('event');
        client.emit(evtChoice, interaction.member);
        interaction.reply({ content: `Emit ${evtChoice} event `, ephemeral: true });
    }
};