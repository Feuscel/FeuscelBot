const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Post your own poll',
    category: 'utils',
    permissions:[],
    ownerOnly: false,
    usage:" ",
    examples:['ping'],
    options: [
        {
            name: 'title',
            description: 'Choose poll title',
            type: 'STRING',
            required: true,
        },
        {
            name: 'content',
            description: 'Choose poll question',
            type: 'STRING',
            required: true,
        }
    ],
    async run(client, message, args) {
        if(!args[0]) return message.reply('Enter a yes/no question for the poll');

        const poll = await message.reply({ embeds: [this.embed(client, message, 'Poll', args.slice(0).join(' '))], fetchReply: true });
        poll.react('❌');
        poll.react('✅');
    },
   
    async runInteraction(client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const poll = await interaction.reply({ embeds: [this.embed(client, interaction, pollTitle, pollContent)], fetchReply: true });
        poll.react('❌');
        poll.react('✅');
    },

    embed(client, object, pollTitle, pollContent) {
        const type = object.type == 'DEFAULT' ? object.author : object.user;

        const embed = new MessageEmbed()
            .setTitle(pollTitle)
            .setColor('#00a3b5')
            .setDescription(pollContent)
            .setTimestamp()
            .setFooter({ text: `New poll generate by ${type.tag}`});
        return embed;
    }
};