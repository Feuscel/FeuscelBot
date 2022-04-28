const { MessageEmbed, Formatters } = require('discord.js');
const dayjs = require('dayjs');
var fs = require('fs');
var path = require('path');

module.exports = {
    name: 'userinfo',
    type:'USER',
    async runInteraction(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId);
        let roles = member.roles.cache.map(role => role).join(', ').replace(/, @everyone|@everyone/gi, ' ');
        // botEmoji = URL.createObjectURL(new LocalFileData(path.join(__dirname, '..', '..', 'ressources', 'img', 'robot-emojie.png').toString()));
        // humanEmoji = URL.createObjectURL(new LocalFileData(path.join(__dirname, '..', '..', 'ressources', 'img', 'man-emoji.png').toString()));
        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`})
            .setColor('#8e48f7')
            .setImage(member.user.displayAvatarURL())
            .addFields(
                { name: 'Name', value: `${member.displayName}`, inline: true },
                { name: 'Modérator', value: `${!member.kickable ? '✅' : '❌'}`, inline: true },
                { name: 'Bot', value: `${member.user.bot ? '✅' : '❌'}`},
                { name: 'Roles', value: `${roles === ' ' ? 'No roles' : roles}`},
                { name: 'Account created', value: `${Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime)}` },
                { name: 'Join the server', value: `${Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime)}`},

            )
        
        interaction.reply({ embeds: [embed], ephemeral: true }); 
    }
};