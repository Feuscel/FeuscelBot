const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs")
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({ intents: 515 });

client.commands = new Collection();

const handlersFolder = fs.readdirSync('./src/utils/handlers').filter(file => file.endsWith('.js'));
handlersFolder.forEach(handler => { require(`./src/utils/handlers/${handler}`)(client) });
require('./src/utils/process/process.js').createEventProcess();

client.login(process.env.DISCORD_TOKEN);