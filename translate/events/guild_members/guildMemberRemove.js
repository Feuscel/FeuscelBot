const { MessageEmbed, Formatters } = require('discord.js');
const dayjs = require('dayjs');

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(client, member) {
        const creationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeCreationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);

        const joinTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeJoinTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);

        const leaveTimestamp = Formatters.time(dayjs().unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeLeaveTimestamp = Formatters.time(dayjs().unix(), Formatters.TimestampStyles.RelativeTime);

        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
            .setColor('#dc143c')
            .setDescription(`± Username: ${member.displayName}
            ± Created: ${creationTimestamp} (${relativeCreationTimestamp})
            ± Joined: ${joinTimestamp} (${relativeJoinTimestamp})
            ± Leaved: ${leaveTimestamp} (${relativeLeaveTimestamp})
            `)
            .setTimestamp()
            .setFooter({ text: 'User leave...'});
        const logChannel = client.channels.cache.get('815984163789340733');
        logChannel.send({ embeds: [embed] });
    }
};