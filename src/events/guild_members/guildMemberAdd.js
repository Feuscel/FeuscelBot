const { MessageEmbed, Formatters } = require('discord.js');
const dayjs = require('dayjs');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member) {
        const creationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeCreationTimestamp = Formatters.time(dayjs(member.user.createdTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);

        const joinTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime);
        const relativeJoinTimestamp = Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime);

        const embed = new MessageEmbed()
            .setAuthor({ name: `${member.user.tag} (${member.id})`, iconURL: member.user.displayAvatarURL() })
            .setColor('#21ff81')
            .setDescription(`± Username: ${member}
            ± Created: ${creationTimestamp} (${relativeCreationTimestamp})
            ± Joined: ${joinTimestamp} (${relativeJoinTimestamp})`)
            .setTimestamp()
            .setFooter({ text: 'User join !'});
        const logChannel = client.channels.cache.get('815984163789340733');
        logChannel.send({ embeds: [embed] });
    }
};