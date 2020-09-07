const Discord = require('discord.js');
const { guildCreated, handleMessage } = require('./events');

const client = new Discord.Client();

client.on('guildCreate', guildCreated);
client.on('message', handleMessage);

client.login(process.env.DISCORD_BOT_TOKEN);
