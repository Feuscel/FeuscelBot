const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./src/commands');
const { prefix } = require('../../../config.json');

const contextDescription = {
    userinfo: "Send user's infos"
}

module.exports = {
    name: 'help',
    description: 'Command Help',
    category: 'utils',
    permissions:["SEND_MESSAGES"],
    ownerOnly: false,
    usage:"help <command>",
    examples:['help', 'help ping'],
    options: [
        {
            name: 'command',
            description: 'Choose a command',
            type: 'STRING',
            required: false
        }
    ],
    run(client, message, args) {
        if(!args.length) return message.channel.send({ embeds: [this.noArgsEmbed(client)] });
        const cmd = client.commands.get(args[0]);
        if(!cmd) return message.channel.send('This command don\'t exist.');
        message.channel.send({ embeds: [this.embed(cmd)] }); 
        

    },
    runInteraction(client, interaction) {
        const cmdName = interaction.options.getString('command');
        if(!cmdName) return interaction.reply({ embeds: [this.noArgsEmbed(client)], ephemeral: true});
        const cmd = client.commands.get(cmdName);
        if(!cmd) return interaction.reply({ content: 'This command don\'t exist.', ephemeral: true });
        interaction.reply({ embeds: [this.embed(cmd)], ephemeral: true });

    },

    noArgsEmbed(client){
        const noArgsEmbed = new MessageEmbed()
                .setColor('#f54ea7')
                .addField('Command list', `List of all avaiable categories and her commands.\nMore informations on a command, type \`${prefix}help <command>\``)
            for(const category of commandFolder){
                noArgsEmbed.addField(
                    `± ${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                    `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
                );
            }
        return noArgsEmbed;
    },

    embed(cmd) {
        const embed = new MessageEmbed()
            .setColor('#f54ea7')
            .setTitle(`${cmd.ownerOnly ? "⚠ Only admins ⚠ " : null}Help:\`${cmd.name}\` `)
            .setDescription(`${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}`)
            .addFields(
                { name: "Use case", value: `${prefix}${cmd.usage} or /${cmd.usage}`},
                { name: "Examples with prefix", value: `${prefix}${cmd.examples.join(` | ${prefix}`)}`},
                { name: "Examples with slash", value: `/${cmd.examples.join(` | /`)}`},
                { name: "Notations, don't include them", value: `{} = subs-commands | [] = mandatory options | <> = optional options`}
            )
            .setFooter({ text: ` ${ cmd.permissions.length ? `Permissions needed : ${cmd.permissions.join(', ')}` : 'Everyone'}` });
        return embed;
    }


};