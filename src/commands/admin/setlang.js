const { languages } =  require('../utils/translate/lang.json') 

module.exports = {
    name: 'setlang',
    description: 'Set language of the bot',
    run(client, message, args) {
        
        message.reply(`Emit ${args[0]} event`)
    },
    options: [
        {
            name: 'language',
            description: 'Choose language',
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
        
        interaction.reply({ content: `Emit ${evtChoice} event `, ephemeral: true });
    }
};