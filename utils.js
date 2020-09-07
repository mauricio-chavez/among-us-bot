const { MessageEmbed } = require('discord.js');

function forEachMember(channel, callback) {
  for (const member of channel.members) {
    if (member[1].user.bot) continue;
    else callback(member[1]);
  }
}

function getUserFromMention(mention, client) {
  if (!mention) return;

  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1);

    if (mention.startsWith('!')) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  }
}

async function createRoles(guild) {
  guild.roles
    .create({
      data: {
        name: 'alive',
        color: 'AQUA',
      },
      reason: 'we needed a role for alive players',
    })
    .catch(console.error);

  guild.roles
    .create({
      data: {
        name: 'dead',
        color: 'LUMINOUS_VIVID_PINK',
      },
      reason: 'we needed a role for dead people',
    })
    .catch(console.error);

  for (const channel of guild.client.channels.cache) {
    if (channel[1].name === 'general' && channel[1].type === 'text') {
      const generalChannel = await guild.client.channels.cache.get(channel[0]);
      const welcomeEmbed = new MessageEmbed()
        .setColor(0xff0000)
        .setTitle('Hello!')
        .setDescription(
          `I've created @alive and @dead roles on this server.
Don't delete them so I can work the proper way.`
        );
      generalChannel.send(welcomeEmbed);
    }
  }
}

module.exports = {
  forEachMember,
  getUserFromMention,
  createRoles,
};
