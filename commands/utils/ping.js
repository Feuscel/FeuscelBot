const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping',

    run(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle('🏓 Pong !')
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            {name: 'Latency', value: `\`${client.ws.ping}ms\``, inline: true}
        )
        .setTimestamp()
        .setFooter({ text: message.author.username, iconURL: message.author.displayAvatarURL() });
    
        message.channel.send({ embeds: [embed] }); 

    },
    runInteraction(client, interaction) {
        const embed = new MessageEmbed()
            .setTitle('🏓 Pong !')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {name: 'Latency', value: `\`${client.ws.ping}ms\``, inline: true}
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });
        
        interaction.reply({ embeds: [embed] }); 
    }
};