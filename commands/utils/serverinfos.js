const { MessageEmbed, Formatters } = require('discord.js');
const dayjs = require('dayjs');

module.exports = {
    name: 'serverinfos',
    description: '💻 Server informations',

    run(client, message, args) {
        message.channel.send({ embeds: [ this.embed(client, message, args) ] }); 

    },
    runInteraction(client, interaction) {
        interaction.reply({ embeds: [this.embed(client, interaction)] }); 
    },

    embed(client, object, ...args) {
        const type = object.type == 'DEFAULT' ? object.author : object.user;
        const embed = new MessageEmbed()
            .setTitle('💻 Server informations')
            .setThumbnail(object.guild.iconURL() == null ? `${client.user.displayAvatarURL()}` : `${object.guild.iconURL()}`)
            .addFields(
                {name: 'Total member', value: `\`${object.guild.memberCount}\``, inline: true},
                {name: 'Description', value: `${object.guild.description == null ? 'No server description' : object.guild.description}`, inline: true},
                {name: 'Created at', value: `${Formatters.time(dayjs(object.guild.createdAt).unix(), Formatters.TimestampStyles.ShortDateTime)} (${Formatters.time(dayjs(object.guild.createdAt).unix(), Formatters.TimestampStyles.RelativeTime)})`},
            )
            .setTimestamp()
            .setFooter({ text: type.username, iconURL: type.displayAvatarURL() });
            return embed;
    }

};