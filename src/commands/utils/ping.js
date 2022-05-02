const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Show latency',
    category: 'utils',
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,
    usage:"ping",
    examples:['ping'],

    run(client, message, args) {
    
        message.channel.send({ embeds: [this.embed(client, message, args)] }); 

    },
    runInteraction(client, interaction) {
        
        interaction.reply({ embeds: [this.embed(client, interaction)] }); 
    },

    embed(client, object, ...args) {
        const type = object.type == 'DEFAULT' ? object.author : object.user;
        const embed = new MessageEmbed()
            .setTitle('🏓 Pong !')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {name: 'Latency', value: `\`${client.ws.ping}ms\``, inline: true}
            )
            .setTimestamp()
            .setFooter({ text: type.username, iconURL: type.displayAvatarURL() });
        return embed;
    }
};