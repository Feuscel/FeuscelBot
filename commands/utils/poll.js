const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'poll',
    description: 'Post your own poll',
    async run(client, message, args) {
        if(!args[0]) return message.reply('Enter a yes/no question for the poll');
        const embed = new MessageEmbed()
            .setTitle('Poll')
            .setColor('#00a3b5')
            .setDescription(args.slice(0).join(' '))
            .setTimestamp()
            .setFooter({ text: `New poll generate by ${message.author.tag}`});

        const poll = await message.reply({ embeds: [embed], fetchReply: true });
        poll.react('❌');
        poll.react('✅');
    },
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
    async runInteraction(client, interaction) {
        const pollTitle = interaction.options.getString('title');
        const pollContent = interaction.options.getString('content');

        const embed = new MessageEmbed()
            .setTitle(pollTitle)
            .setColor('#00a3b5')
            .setDescription(pollContent)
            .setTimestamp()
            .setFooter({ text: `New poll generate by ${interaction.user.tag}`});

        const poll = await interaction.reply({ embeds: [embed], fetchReply: true });
        poll.react('❌');
        poll.react('✅');
    }
};