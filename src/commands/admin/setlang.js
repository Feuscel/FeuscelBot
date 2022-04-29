const { languages } =  require('../../utils/translate/lang.json') 

const listLang = languages.map((lang) =>{ return {
    name: lang.language, 
    value: lang.language
}});

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
            choices: listLang
        }
    ],
    runInteraction(client, interaction) {
        console.log(listLang)
        //interaction.reply({ content: `Emit ${evtChoice} event `, ephemeral: true });
    }
};