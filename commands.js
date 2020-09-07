const { MessageEmbed } = require('discord.js');
const { forEachMember, getUserFromMention } = require('./utils');

function start(message, channel) {
  const aliveRole = message.guild.roles.cache.find(
    role => role.name === 'alive'
  );
  const deadRole = message.guild.roles.cache.find(role => role.name === 'dead');
  forEachMember(channel, member => {
    member.voice.setMute(true);
    member.roles.add(aliveRole);
    member.roles.remove(deadRole);
  });
  const shhEmbed = new MessageEmbed()
    .setColor(0xff0000)
    .setTitle('The game has started...')
    .setImage('https://i.imgur.com/mNvI6KY.jpeg');
  message.channel.send(shhEmbed);
}

function shh(message, channel) {
  forEachMember(channel, member => {
    member.voice.setMute(true);
  });
  const shhEmbed = new MessageEmbed()
    .setColor(0xff0000)
    .setTitle('The game will continue...')
    .setImage('https://i.imgur.com/mNvI6KY.jpeg');
  message.channel.send(shhEmbed);
}

function meeting(message, channel) {
  forEachMember(channel, member => {
    if (member.roles.cache.some(role => role.name === 'alive')) {
      member.voice.setMute(false);
    }
  });
  const meetingEmbed = new MessageEmbed()
    .setColor(0xff0000)
    .setTitle('Meeting time...')
    .setImage('https://i.imgur.com/fElXcTI.png');
  message.channel.send(meetingEmbed);
}

function kill(message, channel, args) {
  const aliveRole = message.guild.roles.cache.find(
    role => role.name === 'alive'
  );
  const deadRole = message.guild.roles.cache.find(role => role.name === 'dead');
  const mentionedIds = [];
  const mentionedNames = [];
  for (const arg of args) {
    const user = getUserFromMention(arg, message.client);
    if (!user) continue;
    else {
      mentionedIds.push(user.id);
      mentionedNames.push(user.username);
    }
  }
  forEachMember(channel, member => {
    if (mentionedIds.includes(member.user.id)) {
      member.roles.add(deadRole);
      member.roles.remove(aliveRole);
    }
  });
  for (const name of mentionedNames) {
    const killEmbed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle(`@${name} is no longer alive.`);
    message.channel.send(killEmbed);
  }
}

function unkill(message, channel, args) {
  const aliveRole = message.guild.roles.cache.find(
    role => role.name === 'alive'
  );
  const deadRole = message.guild.roles.cache.find(role => role.name === 'dead');
  const mentionedIds = [];
  const mentionedNames = [];
  for (const arg of args) {
    const user = getUserFromMention(arg, message.client);
    if (!user) continue;
    else {
      mentionedIds.push(user.id);
      mentionedNames.push(user.username);
    }
  }
  forEachMember(channel, member => {
    if (mentionedIds.includes(member.user.id)) {
      member.roles.add(aliveRole);
      member.roles.remove(deadRole);
    }
  });
  for (const name of mentionedNames) {
    const unkillEmbed = new MessageEmbed()
      .setColor(0xff0000)
      .setTitle(`@${name} is alive again.`);
    message.channel.send(unkillEmbed);
  }
}

function finish(message, channel) {
  const aliveRole = message.guild.roles.cache.find(
    role => role.name === 'alive'
  );
  const deadRole = message.guild.roles.cache.find(role => role.name === 'dead');
  forEachMember(channel, member => {
    member.voice.setMute(false);
    member.roles.remove(aliveRole);
    member.roles.remove(deadRole);
  });
  const endEmbed = new MessageEmbed()
    .setColor(0xff0000)
    .setTitle(`The game has ended.`);
  message.channel.send(endEmbed);
}

module.exports = { start, shh, meeting, kill, unkill, finish };
